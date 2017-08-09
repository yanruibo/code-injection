
function autolink(s) 
{   
   var hlink = /\s(ht|f)tp:\/\/([^ \,\;\:\!\)\(\"\'\<\>\f\n\r\t\v])+/g;
   return (s.replace (hlink, function ($0,$1,$2) { s = $0.substring(1,$0.length); 
                                                   // remove trailing dots, if any
                                                   while (s.length>0 && s.charAt(s.length-1)=='.') 
                                                      s=s.substring(0,s.length-1);
                                                   // add hlink
                                                   return " " + s.link(s); 
                                                 }
                     ) 
           );
}

function doautolink()
{
   var bodycontent = document.body.innerHTML;
   bodycontent = autolink(bodycontent);
   document.body.innerHTML = bodycontent;
}

doautolink();

function strval(s) {
  if (typeof s == 'string') {
    return s;
  } 
  else if (typeof s == 'function') {
    return s();
  } 
  else if (s instanceof XMLWriter) {
    return s.toString();
  }
  else throw Error('Bad Parameter');
}

function XMLWriter(indent, callback) {

    if (!(this instanceof XMLWriter)) {
        return new XMLWriter();
    }

    this.name_regex = /[_:A-Za-z][-._:A-Za-z0-9]*/;
    this.output = '';
    this.stack = [];
    this.tags = 0;
    this.attributes = 0;
    this.attribute = 0;
    this.texts = 0;
    this.comment = 0;
    this.pi = 0;
    this.cdata = 0;
    this.writer;
    this.writer_encoding = 'UTF-8';

    if (typeof callback == 'function') {
        this.writer = callback;
    } else {
        this.writer = function (s, e) {
            this.output += s;
        }
    }
}

XMLWriter.prototype = {
    toString : function () {
        this.flush();
        return this.output;
    },

    write : function () {
        for (var i = 0; i < arguments.length; i++) {
            this.writer(arguments[i], this.writer_encoding);
        }
    },


    flush : function () {
        for (var i = this.tags; i > 0; i--) {
            this.endElement();
        }
        this.tags = 0;
    },

    startDocument : function (version, encoding, standalone) {
        if (this.tags || this.attributes) return this;

        this.startPI('xml');
        this.startAttribute('version');
        this.text(typeof version == "string" ? version : "1.0");
        this.endAttribute();
        if (typeof encoding == "string") {
            this.startAttribute('encoding');
            this.text(encoding);
            this.endAttribute();
            writer_encoding = encoding;
        }
        if (standalone) {
            this.startAttribute('standalone');
            this.text("yes");
            this.endAttribute();
        }
        this.endPI();
        this.write('\n');
        return this;
    },

    endDocument : function () {
        if (this.attributes) this.endAttributes();
        return this;
    },

    writeElement : function (name, content) {
        return this.startElement(name).text(content).endElement();
    },

    startElement : function (name) {
        name = strval(name);
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (this.attributes) this.endAttributes();
        ++this.tags;
        this.texts = 0;
        this.stack.push({
            name: name,
            tags: this.tags
        });
        this.write('<', name);
        this.startAttributes();
        return this;
    },

    endElement : function () {
        if (!this.tags) return this;
        var t = this.stack.pop();
        if (this.attributes > 0) {
            if (this.attribute) {
                if (this.texts) this.endAttribute();
                this.endAttribute();
            }
            this.write('/');
            this.endAttributes();
        } else {
            this.write('</', t.name, '>');
        }
        --this.tags;
        this.texts = 0;
        return this;
    },

    writeAttribute : function (name, content) {
        return this.startAttribute(name).text(content).endAttribute();
    },

    startAttributes : function () {
        this.attributes = 1;
        return this;
    },

    endAttributes : function () {
        if (!this.attributes) return this;
        if (this.attribute) this.endAttribute();
        this.attributes = 0;
        this.attribute = 0;
        this.texts = 0;
        this.write('>');
        return this;
    },

    startAttribute : function (name) {
        name = strval(name);
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (!this.attributes && !this.pi) return this;
        if (this.attribute) return this;
        this.attribute = 1;
        this.write(' ', name, '="');
        return this;
    },

    endAttribute : function () {
        if (!this.attribute) return this;
        this.attribute = 0;
        this.texts = 0;
        this.write('"');
        return this;
    },

    text : function (content) {
        content = strval(content);
        if (!this.tags && !this.comment && !this.pi && !this.cdata) return this;
        if (this.attributes && this.attribute) {
            ++this.texts;
            this.write(content.replace('&', '&amp;').replace('"', '&quot;'));
            return this;
        } else if (this.attributes && !this.attribute) {
            this.endAttributes();
        }
        ++this.texts;
        this.write(content.replace('&', '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        return this;
    },

    writeComment : function (content) {
        return this.startComment().text(content).endComment();
    },

    startComment : function () {
        if (this.comment) return this;
        if (this.attributes) this.endAttributes();
        this.write('<!--');
        this.comment = 1;
        return this;
    },

    endComment : function () {
        if (!this.comment) return this;
        this.write('-->');
        this.comment = 0;
        return this;
    },

    writePI : function (name, content) {
        return this.startPI(name).text(content).endPI()
    },

    startPI : function (name) {
        name = strval(name);
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (this.pi) return this;
        if (this.attributes) this.endAttributes();
        this.write('<?', name);
        this.pi = 1;
        return this;
    },
    
    endPI : function () {
        if (!this.pi) return this;
        this.write('?>');
        this.pi = 0;
        return this;
    },
    
    writeCData : function (content) {
        return this.startCData().text(content).endCData();
    },
    
    startCData : function () {
        if (this.cdata) return this;
        if (this.attributes) this.endAttributes();
        this.write('<![CDATA[');
        this.cdata = 1;
        return this;
    },
    
    endCData : function () {
        if (!this.cdata) return this;
        this.write(']]>');
        this.cdata = 0;
        return this;
    },

    writeRaw : function(content) {	
        content = strval(content);
        if (!this.tags && !this.comment && !this.pi && !this.cdata) return this;
        if (this.attributes && this.attribute) {
            ++this.texts;
            this.write(content.replace('&', '&amp;').replace('"', '&quot;'));
            return this;
        } else if (this.attributes && !this.attribute) {
            this.endAttributes();
        }
        ++this.texts;
        this.write(content);
        return this;
    }

}

if(typeof module != 'undefined') module.exports = XMLWriter;
else window.XMLWriter = XMLWriter;


if(typeof exports == 'undefined')
{
	// Browser Code
	enml = {};
	enml.URLOfResource = URLOfResource;
	enml.ENMLOfPlainText = ENMLOfPlainText;
	enml.HTMLOfENML = HTMLOfENML;
}
else
{

	// Node JS
	var XMLWriter = require('./xml_writer');
	var SaxParser = require('./xml_parser').SaxParser;

	exports.URLOfResource = URLOfResource;
	exports.ENMLOfPlainText = ENMLOfPlainText;
	exports.HTMLOfENML = HTMLOfENML;
}

/**
 * URLOfResource Create URL of the resource on Evernote's server
 * 
 * @param {
 *            string } guid - the resource's guid
 * @param {
 *            string } shardId - shard id of the resource owner
 * @return string - URL
 */
function URLOfResource(guid, shardId){
	return 'https://www.evernote.com/shard/'+shardId+'/res/'+guid;
}

/**
 * enmlHashToBodyHash 'bodyHash' returned from Evernote API is not equal to
 * 'enmlHash' (hash string in the notes' content). 'enmlHash' is 'bodyHash'
 * in ascii-hex form
 * 
 * @param {
 *            string } enmlHash - (Hash string in notes' content)
 * @return string - bodyHash (Binary hash in Evernote API)
 */
function BodyHashOfENMLHash(enmlHash){

	var buffer = [];
	for(var i =0 ; i<enmlHash.length; i += 2) 
		buffer.push( parseInt(enmlHash[i],16)*16 + parseInt(enmlHash[i+1],16));

	var bodyHash = '';
	for(var i =0 ; i<buffer.length; i ++){
		if(buffer[i] >= 128)
			bodyHash += String.fromCharCode(65533);
		else
			bodyHash += String.fromCharCode(buffer[i]);
	} 

	return bodyHash;
}


/**
 * ENMLOfPlainText
 * 
 * @param {
 *            string } text (Plain)
 * @return string - ENML
 */
function ENMLOfPlainText(text){

	var writer = new XMLWriter;

	writer.startDocument = writer.startDocument || writer.writeStartDocument;
	writer.endDocument 	 = writer.endDocument || writer.writeEndDocument;
	writer.startDocument = writer.startElement || writer.writeStartElement;
	writer.startDocument = writer.endElement || writer.writeEndElement;

	writer.startDocument('1.0', 'UTF-8', false);
	writer.write('<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">');
	writer.write("\n")
	writer.startElement('en-note');
	writer.writeAttribute('style', 'word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;');

	var lines = text.match(/^.*((\r\n|\n|\r)|$)/gm);

	lines.forEach(function(line) {
		writer.startElement('div');
		writer.text(line.replace(/(\r\n|\n|\r)/,''));
		writer.endElement();

		writer.text("\n")
	});

	writer.endElement();
	writer.endDocument();

	return writer.toString();
}

/**
 * HTMLOfENML Convert ENML into HTML for showing in web browsers.
 * 
 * @param {
 *            string } text (ENML)
 * @param {
 *            string } shard ( shardId )
 * @param {
 *            Map <string (hash), string (url) >, Optional } resources
 * @return string - HTML
 */
function HTMLOfENML(text, resources){

	resources = resources || {};
	var writer = new XMLWriter;

	var parser = new SaxParser(function(cb) 
	{
		cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) 
		{
			if(elem == 'en-note')
			{
				writer.startElement('html');
				writer.startElement('head');
				writer.startElement('meta');
				writer.writeAttribute('http-equiv', 'Content-Type');
				writer.writeAttribute('content', 'text/html; charset=UTF-8');
				writer.endElement();
				writer.endElement();
				writer.startElement('body');
				writer.writeAttribute('style', 'word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;');
			} 
			else if(elem == 'en-todo')
			{
				writer.startElement('input');
				writer.writeAttribute('type', 'checkbox');
			}
			else if(elem == 'en-media')
			{
				var type = null;
				var hash = null;
				var width = 0;
				var height = 0;

				if(attrs) 
					attrs.forEach(function(attr) 
					{
						if(attr[0] == 'type') type = attr[1];
						if(attr[0] == 'hash') hash = attr[1];
						if(attr[0] == 'width') width = attr[1];
						if(attr[0] == 'height') height = attr[1];
					});

				if(type.match('image')) 
				{
					writer.startElement('img');
					// hash = BodyHashOfENMLHash(hash);
					var resource = resources[hash];
					if(resource)
						writer.writeAttribute('src', resource.path);
					writer.writeAttribute('width', '100%');
					// if(width) writer.writeAttribute('width', width);
					// if(height) writer.writeAttribute('height', height);
				}
				else 
				{
					writer.startElement('a');
					var resource = resources[hash];
					if(resource)
						writer.writeAttribute('href', resource.localpath);
					writer.writeAttribute('target', "_blank");
					writer.text(resource.filename);
					writer.endElement();
				}
			}	
			else 
			{
				writer.startElement(elem);
			}

			if(attrs && elem != 'en-media') 
				attrs.forEach(function(attr) 
				{
					writer.writeAttribute(attr[0], attr[1]);
				});
		});
		
		cb.onEndElementNS(function(elem, prefix, uri) 
		{
			if(elem == 'en-note')
			{
				writer.endElement(); // body
				writer.endElement(); // html
			}
			else if(elem == 'en-todo')
			{
			}
			else if(elem == 'en-media')
			{
			}
			else
			{
				writer.endElement();
			}
		});
		
		cb.onCharacters(function(chars) 
		{
			writer.text(chars);
		});
	});

	parser.parseString(text);
	return writer.toString();
}	



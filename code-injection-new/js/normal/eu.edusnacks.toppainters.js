




$(".header").animate({left: '+=210px'}, "fast").animate({left: '-=10px',opacity: 1}, "slow");
$("button").click(buttonHandler);
initPage();


﻿function desc(key){
data = new Array();
data = [
{name: 'PABLO PICASSO', years: '1881-1973', portrait: '0.jpg', style: 'Cubism', description: '<p>Pablo Picasso (25 October 1881 – 8 April 1973) was a Spanish painter, sculptor, printmaker, ceramicist, and stage designer who spent most of his adult life in France. As one of the greatest and most influential artists of the 20th century, he is widely known for co-founding the Cubist movement, the invention of constructed sculpture, the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d\'Avignon (1907), and Guernica (1937), a portrayal of the German bombing of Guernica during the Spanish Civil War.</p> <p>Picasso, Henri Matisse and Marcel Duchamp are commonly regarded as the three artists who most defined the revolutionary developments in the plastic arts in the opening decades of the 20th century, responsible for significant developments in painting, sculpture, printmaking and ceramics.</p> <p>Picasso demonstrated extraordinary artistic talent in his early years, painting in a realistic manner through his childhood and adolescence. During the first decade of the 20th century, his style changed as he experimented with different theories, techniques, and ideas. His revolutionary artistic accomplishments brought him universal renown and immense fortune, making him one of the best-known figures in 20th-century art.</p> '},
{name: 'GIOTTO DI BONDONE', years: '1267-1337', portrait: '1.jpg', style: 'Late Middle Ages', description: '<p>Giotto di Bondone (1266 – 1337), better known simply as Giotto, was an Italian painter and architect from Florence in the late Middle Ages. He is generally considered the first in a line of great artists who contributed to the Italian Renaissance.</p> <p>Giotto\'s contemporary, the banker and chronicler Giovanni Villani, wrote that Giotto was "the most sovereign master of painting in his time, who drew all his figures and their postures according to nature. And he was given a salary by the Comune of Florence in virtue of his talent and excellence."</p> <p>The late-16th century biographer Giorgio Vasari describes Giotto as making a decisive break with the prevalent Byzantine style and as initiating "the great art of painting as we know it today, introducing the technique of drawing accurately from life, which had been neglected for more than two hundred years."</p> <p>Giotto\'s masterwork is the decoration of the Scrovegni Chapel in Padua, also known as the Arena Chapel, completed around 1305. This fresco cycle depicts the life of the Virgin and the life of Christ. It is regarded as one of the supreme masterpieces of the Early Renaissance. That Giotto painted the Arena Chapel and that he was chosen by the Comune of Florence in 1334 to design the new campanile (bell tower) of the Florence Cathedral are among the few certainties of his biography. Almost every other aspect of it is subject to controversy: his birthdate, his birthplace, his appearance, his apprenticeship, the order in which he created his works, whether or not he painted the famous frescoes at Assisi, and his burial place.</p> '},
{name: 'LEONARDO DA VINCI', years: '1452-1519', portrait: '2.jpg', style: 'High Renaissance', description: '<p>Leonardo di ser Piero da Vinci (1452 – 1519) was an Italian Renaissance polymath: painter, sculptor, architect, musician, mathematician, engineer, inventor, anatomist, geologist, cartographer, botanist, and writer. His genius, perhaps more than that of any other figure, epitomized the Renaissance humanist ideal. Leonardo has often been described as the archetype of the Renaissance Man, a man of "unquenchable curiosity" and "feverishly inventive imagination". He is widely considered to be one of the greatest painters of all time and perhaps the most diversely talented person ever to have lived.</p> <p>According to art historian Helen Gardner, the scope and depth of his interests were without precedent and "his mind and personality seem to us superhuman, the man himself mysterious and remote". Marco Rosci states that while there is much speculation about Leonardo, his vision of the world is essentially logical rather than mysterious, and that the empirical methods he employed were unusual for his time.</p> <p>Born out of wedlock to a notary, Piero da Vinci, and a peasant woman, Caterina, at Vinci in the region of Florence, Leonardo was educated in the studio of the renowned Florentine painter, Verrocchio. Much of his earlier working life was spent in the service of Ludovico il Moro in Milan. He later worked in Rome, Bologna and Venice, and he spent his last years in France at the home awarded him by Francis I.</p> <p>Leonardo was and is renowned primarily as a painter. Among his works, the Mona Lisa is the most famous and most parodied portrait and The Last Supper the most reproduced religious painting of all time, with their fame approached only by Michelangelo\'s The Creation of Adam. Leonardo\'s drawing of the Vitruvian Man is also regarded as a cultural icon, being reproduced on items as varied as the euro, textbooks, and T-shirts. Perhaps fifteen of his paintings survive, the small number because of his constant, and frequently disastrous, experimentation with new techniques, and his chronic procrastination.[nb 2] Nevertheless, these few works, together with his notebooks, which contain drawings, scientific diagrams, and his thoughts on the nature of painting, compose a contribution to later generations of artists rivalled only by that of his contemporary, Michelangelo.</p> <p>Leonardo is revered for his technological ingenuity. He conceptualised a helicopter, a tank, concentrated solar power, a calculator, and the double hull, and he outlined a rudimentary theory of plate tectonics. Relatively few of his designs were constructed or were even feasible during his lifetime,[nb 3] but some of his smaller inventions, such as an automated bobbin winder and a machine for testing the tensile strength of wire, entered the world of manufacturing unheralded.[nb 4] He made important discoveries in anatomy, civil engineering, optics, and hydrodynamics, but he did not publish his findings and they had no direct influence on later science.</p> '},
{name: 'PAUL CÉZANNE', years: '1839-1906', portrait: '3.jpg', style: 'Post-Impressionism', description: '<p>Paul Cézanne (1839–1906) was a French artist and Post-Impressionist painter whose work laid the foundations of the transition from the 19th-century conception of artistic endeavour to a new and radically different world of art in the 20th century. Cézanne can be said to form the bridge between late 19th-century Impressionism and the early 20th century\'s new line of artistic enquiry, Cubism. The line attributed to both Matisse and Picasso that Cézanne "is the father of us all" cannot be easily dismissed.</p> <p>Cézanne\'s often repetitive, exploratory brushstrokes are highly characteristic and clearly recognizable. He used planes of colour and small brushstrokes that build up to form complex fields. The paintings convey Cézanne\'s intense study of his subjects.</p> <p>After Cézanne died in 1906, his paintings were exhibited in Paris in a large museum-like retrospective in September 1907. The 1907 Cézanne retrospective at the Salon d\'Automne greatly affected the direction that the avant-garde in Paris took, lending credence to his position as one of the most influential artists of the 19th century and to the advent of Cubism.</p> <p>Cézanne\'s explorations of geometric simplification and optical phenomena inspired Picasso, Braque, Gris and others to experiment with ever more complex multiple views of the same subject and eventually to the fracturing of form. Cézanne thus sparked one of the most revolutionary areas of artistic enquiry of the 20th century, one which was to affect profoundly the development of modern art. A prize in his memory, called the Cézanne medal, is granted by the city of Aix en Provence, in France for special achievement in the arts.</p> '},
{name: 'REMBRANDT VAN RIJN', years: '1606-1669', portrait: '4.jpg', style: 'Baroque', description: '<p>Rembrandt Harmenszoon van Rijn (1606-1669) was a Dutch painter and etcher. He is generally considered one of the greatest painters and printmakers in European art history and the most important in Dutch history. His contributions to art came in a period of great wealth and cultural achievement that historians call the Dutch Golden Age when Dutch Golden Age painting, although in many ways antithetical to the Baroque style that dominated Europe, was extremely prolific and innovative.</p> <p>Having achieved youthful success as a portrait painter, Rembrandt\'s later years were marked by personal tragedy and financial hardships. Yet his etchings and paintings were popular throughout his lifetime, his reputation as an artist remained high, and for twenty years he taught many important Dutch painters. Rembrandt\'s greatest creative triumphs are exemplified especially in his portraits of his contemporaries, self-portraits and illustrations of scenes from the Bible. His self-portraits form a unique and intimate biography, in which the artist surveyed himself without vanity and with the utmost sincerity.</p> <p>In his paintings and prints he exhibited knowledge of classical iconography, which he molded to fit the requirements of his own experience; thus, the depiction of a biblical scene was informed by Rembrandt\'s knowledge of the specific text, his assimilation of classical composition, and his observations of Amsterdam\'s Jewish population. Because of his empathy for the human condition, he has been called "one of the great prophets of civilization."</p> '},
{name: 'DIEGO VELÁZQUEZ', years: '1599-1660', portrait: '5.jpg', style: 'Baroque', description: '<p>Diego Rodríguez de Silva y Velázquez (1599-1660) was a Spanish painter who was the leading artist in the court of King Philip IV. He was an individualistic artist of the contemporary Baroque period, important as a portrait artist. In addition to numerous renditions of scenes of historical and cultural significance, he painted scores of portraits of the Spanish royal family, other notable European figures, and commoners, culminating in the production of his masterpiece Las Meninas (1656).</p> <p>From the first quarter of the nineteenth century, Velázquez\'s artwork was a model for the realist and impressionist painters, in particular Édouard Manet. Since that time, famous modern artists, including Pablo Picasso, Salvador Dalí and Francis Bacon, have paid tribute to Velázquez by recreating several of his most famous works.</p> '},
{name: 'WASSILY KANDINSKY', years: '1866-1944', portrait: '6.jpg', style: 'Expressionism', description: '<p>Wassily Wassilyevich Kandinsky (1866 – 1944) was an influential Russian painter and art theorist. He is credited with painting the first purely abstract works. Born in Moscow, Kandinsky spent his childhood in Odessa. He enrolled at the University of Moscow, studying law and economics. Successful in his profession—he was offered a professorship (chair of Roman Law) at the University of Dorpat—he began painting studies (life-drawing, sketching and anatomy) at the age of 30.</p> <p>In 1896 Kandinsky settled in Munich, studying first at Anton Ažbe\'s private school and then at the Academy of Fine Arts. He returned to Moscow in 1914, after the outbreak of World War I. Kandinsky was unsympathetic to the official theories on art in Moscow, and returned to Germany in 1921. There, he taught at the Bauhaus school of art and architecture from 1922 until the Nazis closed it in 1933. He then moved to France where he lived the rest of his life, became a French citizen in 1939, and produced some of his most prominent art. He died at Neuilly-sur-Seine in 1944.</p> '},
{name: 'CLAUDE MONET', years: '1840-1926', portrait: '7.jpg', style: 'Impressionism', description: '<p>Claude Monet (14 November 1840 – 5 December 1926) was a founder of French impressionist painting, and the most consistent and prolific practitioner of the movement\'s philosophy of expressing one\'s perceptions before nature, especially as applied to plein-air landscape painting. The term Impressionism is derived from the title of his painting Impression, Sunrise (Impression, soleil levant).</p> <p>Claude Monet was born on 14 November 1840 on the 5th floor of 45 rue Laffitte, in the 9th arrondissement of Paris. He was the second son of Claude Adolphe Monet and Louise Justine Aubrée Monet, both of them second-generation Parisians. </p> <p>When Monet traveled to Paris to visit the Louvre, he witnessed painters copying from the old masters. Having brought his paints and other tools with him, he would instead go and sit by a window and paint what he saw.[citation needed] Monet was in Paris for several years and met other young painters who would become friends and fellow impressionists; among them was Édouard Manet.</p> <p>In 1872, he painted Impression, Sunrise (Impression, soleil levant) depicting a Le Havre port landscape. It hung in the first Impressionist exhibition in 1874 and is now displayed in the Musée Marmottan Monet in Paris. From the painting\'s title, art critic Louis Leroy coined the term "Impressionism", which he intended as disparagement but which the Impressionists appropriated for themselves.</p> '},
{name: 'CARAVAGIGO', years: '1571-1610', portrait: '8.jpg', style: 'Baroque', description: '<p>Michelangelo Merisi da Caravaggio (1571 – 1610) was an Italian artist active in Rome, Naples, Malta, and Sicily between 1593 and 1610. His paintings, which combine a realistic observation of the human state, both physical and emotional, with a dramatic use of lighting, had a formative influence on the Baroque school of painting.</p> <p>Caravaggio trained as a painter in Milan under Simone Peterzano who had himself trained under Titian. In his early twenties Caravaggio moved to Rome where, during the late 16th and early 17th centuries, many huge new churches and palazzi were being built and paintings were needed to fill them. During the Counter-Reformation, the Roman Catholic Church searched for religious art with which to counter the threat of Protestantism, and for this task the artificial conventions of Mannerism, which had ruled art for almost a century, no longer seemed adequate.</p> <p>Caravaggio\'s novelty was a radical naturalism that combined close physical observation with a dramatic, even theatrical, use of chiaroscuro. This came to be known as Tenebrism, the shift from light to dark with little intermediate value. He burst upon the Rome art scene in 1600 with the success of his first public commissions, the Martyrdom of Saint Matthew and Calling of Saint Matthew. Thereafter he never lacked commissions or patrons, yet he handled his success poorly. He was jailed on several occasions, vandalized his own apartment, and ultimately had a death warrant issued for him by the Pope.</p> <p>An early published notice on him, dating from 1604 and describing his lifestyle three years previously, tells how "after a fortnight\'s work he will swagger about for a month or two with a sword at his side and a servant following him, from one ball-court to the next, ever ready to engage in a fight or an argument, so that it is most awkward to get along with him." In 1606 he killed a young man in a brawl and fled from Rome with a price on his head. He was involved in a brawl in Malta in 1608, and another in Naples in 1609, possibly a deliberate attempt on his life by unidentified enemies. This encounter left him severely injured. A year later, at the age of 38, he died under mysterious circumstances in Porto Ercole, reportedly from a fever while on his way to Rome to receive a pardon.</p> <p>Famous while he lived, Caravaggio was forgotten almost immediately after his death, and it was only in the 20th century that his importance to the development of Western art was rediscovered. Despite this, his influence on the new Baroque style that eventually emerged from the ruins of Mannerism was profound. It can be seen directly or indirectly in the work of Rubens, Jusepe de Ribera, Bernini, and Rembrandt, and artists in the following generation heavily under his influence were called the "Caravaggisti" or "Caravagesques", as well as Tenebrists or "Tenebrosi" ("shadowists"). Art historian Andre Berne-Joffroy said of him: "What begins in the work of Caravaggio is, quite simply, modern painting."</p> '},
{name: 'WILLIAM TURNER', years: '1775-1851', portrait: '9.jpg', style: 'Romanticism', description: '<p>Joseph Mallord William "J. M. W." Turner (23 April 1775 – 19 December 1851) was a British Romantic landscape painter, water-colourist, and printmaker. Turner was considered a controversial figure in his day, but is now regarded as the artist who elevated landscape painting to an eminence rivalling history painting. Although renowned for his oil paintings, Turner is also one of the greatest masters of British watercolour landscape painting. He is commonly known as "the painter of light" and his work is regarded as a Romantic preface to Impressionism.</p> <p>Turner\'s talent was recognised early in his life. His mature work is characterised by a chromatic palette and broadly applied atmospheric washes of paint. According to David Piper\'s The Illustrated History of Art, his later pictures were called "fantastic puzzles." However, Turner was recognised as an artistic genius: the influential English art critic John Ruskin described him as the artist who could most "stirringly and truthfully measure the moods of Nature."</p> <p>Joseph Mallord William Turner was born on or around 23 April 1775[a] in Maiden Lane, Covent Garden, London, England. His father, William Turner (1738–7 August 1829), was a barber and wig maker, His mother, Mary Marshall, came from a family of butchers.</p> <p>Many early sketches by Turner were architectural studies and/or exercises in perspective and it is known that as a young man he worked for several architects including Thomas Hardwick (junior), James Wyatt and Bonomi the Elder.</p> <p>Turner exhibited his first oil painting at the academy in 1796, Fishermen at Sea. A nocturnal moonlit scene off the Needles, Isle of Wight. </p> <p>Turner travelled widely in Europe, starting with France and Switzerland in 1802 and studying in the Louvre in Paris in the same year. He made many visits to Venice. On a visit to Lyme Regis, in Dorset he painted a stormy scene (now in the Cincinnati Art Museum).</p> <p>Important support for his work came from Walter Ramsden Fawkes, of Farnley Hall, near Otley in Yorkshire, who became a close friend of the artist. Turner first visited Otley in 1797, aged 22, when commissioned to paint watercolours of the area. He was so attracted to Otley and the surrounding area that he returned to it throughout his career. The stormy backdrop of Hannibal Crossing The Alps is reputed to have been inspired by a storm over the Chevin in Otley while he was staying at Farnley Hall.</p> <p>As Turner grew older, he became more eccentric. He had few close friends except for his father, who lived with him for 30 years and worked as his studio assistant. His father\'s death in 1829 had a profound effect, and thereafter he was subject to bouts of depression. He never married but had a relationship with an older widow, Sarah Danby. He is believed to have been the father of her two daughters born in 1801 and 1811.</p> <p>Turner died in the house of his mistress Sophia Caroline Booth in Cheyne Walk, Chelsea on 19 December 1851. He is said to have uttered the last words "The sun is God" before expiring. At his request he was buried in St Paul\'s Cathedral.</p> '},
{name: 'JAN VAN EYCK ', years: '1390-1441', portrait: '10.jpg', style: 'Early Renaissance', description: '<p>1Jan van Eyck (or Johannes de Eyck) (c. 1390 – 1441) was a Flemish painter active in Bruges and is generally considered one of the most significant Northern European painters of the 15th century. The few surviving records indicate that he was born around 1390, most likely in Maaseik. Outside of works completed with his brother Hubert van Eyck and those ascribed to Hand G —believed to be Jan— of the Turin-Milan Hours illuminated manuscript, only about 23 surviving works are attributed to van Eyck, all are of an exceptionally innovative and technical quality. Little is known of his early life, but his activities following his appointment to the court of Philip the Good c. 1425 are comparatively well documented. Van Eyck had previously served John of Bavaria-Straubing, then ruler of Holland, Hainault and Zeeland. By this time van Eyck had assembled a workshop and was involved in redecorating the Binnenhof palace in The Hague. After John\'s death in 1425 he moved to Bruges and came to the attention of Philip the Good. He served as both court artist and diplomat and became a senior member of the Tournai painters\' guild, where he enjoyed the company of similarly esteemed artists such as Robert Campin and Rogier van der Weyden. Over the following decade van Eyck\'s reputation and technical ability grew, mostly from his innovative approaches towards the handling and manipulating of oil paint. His revolutionary approach to oil was such that a myth, perpetuated by Giorgio Vasari, arose that he had invented oil painting.</p> <p>It is known from historical record that van Eyck was considered a revolutionary master across northern Europe within his lifetime; his designs and methods were heavily copied and reproduced. His motto, one of the first and still most distinctive signatures in art history, ALS IK KAN ("AS I CAN") first appeared in 1433 on Portrait of a Man in a Turban, which can be seen as indicative of his emerging self-confidence at the time. The years between 1434 and 1436 are generally considered his high point when he produced works including the Madonna of Chancellor Rolin, Lucca Madonna and Virgin and Child with Canon van der Paele. He married the much younger Margaret around 1432 at about the same time he bought a home in Bruges. Records from 1437 on suggest that he was held in high esteem by the upper ranks of Burgundian nobility while also accepting many foreign commissions. He died young in July 1441, leaving behind many unfinished works to be completed by workshop journeymen; works that are nevertheless today considered major examples of Early Flemish painting. His local and international reputation was aided by his ties to the then political and cultural influence of the Burgundian court.</p> '},
{name: 'ALBRECHT DÜRER', years: '1471-1528', portrait: '11.jpg', style: 'Renaissance', description: '<p>Albrecht Dürer (1471 – 1528) was a German painter, engraver, printmaker, mathematician, and theorist from Nuremberg. His high-quality woodcuts (nowadays often called Meisterstiche or "master prints") established his reputation and influence across Europe when he was still in his twenties, and he has been conventionally regarded as the greatest artist of the Northern Renaissance ever since. His vast body of work includes altarpieces and religious works, numerous portraits and self-portraits, and copper engravings. The woodcuts, such as the Apocalypse series (1498), retain a more Gothic flavour than the rest of his work. His well-known prints include the Knight, Death, and the Devil (1513), Saint Jerome in his Study (1514) and Melencolia I (1514), which has been the subject of extensive analysis and interpretation. His watercolours also mark him as one of the first European landscape artists, while his ambitious woodcuts revolutionized the potential of that medium.</p> <p>Dürer\'s introduction of classical motifs into Northern art, through his knowledge of Italian artists and German humanists, has secured his reputation as one of the most important figures of the Northern Renaissance. This is reinforced by his theoretical treatises, which involve principles of mathematics, perspective and ideal proportions.</p> '},
{name: 'MICHELANGELO BUONARROTI', years: '1475-1564', portrait: '12.jpg', style: 'High Renaissance', description: '<p>Michelangelo di Lodovico Buonarroti Simoni (1475 – 1564), commonly known as Michelangelo, was an Italian Renaissance sculptor, painter, architect, poet, and engineer who exerted an unparalleled influence on the development of Western art. Despite making few forays beyond the arts, his versatility in the disciplines he took up was of such a high order that he is often considered a contender for the title of the archetypal Renaissance man, along with fellow Italian Leonardo da Vinci.</p> <p>Michelangelo was considered the greatest living artist in his lifetime, and ever since then he has been held to be one of the greatest artists of all time. A number of his works in painting, sculpture, and architecture rank among the most famous in existence. His output in every field during his long life was prodigious; when the sheer volume of correspondence, sketches, and reminiscences that survive is also taken into account, he is the best-documented artist of the 16th century.</p> <p>Two of his best-known works, the Pietà and David, were sculpted before he turned thirty. Despite his low opinion of painting, Michelangelo also created two of the most influential works in fresco in the history of Western art: the scenes from Genesis on the ceiling and The Last Judgment on the altar wall of the Sistine Chapel in Rome. As an architect, Michelangelo pioneered the Mannerist style at the Laurentian Library. At 74 he succeeded Antonio da Sangallo the Younger as the architect of St. Peter\'s Basilica. Michelangelo transformed the plan, the western end being finished to Michelangelo\'s design, the dome being completed after his death with some modification.</p> <p>In a demonstration of Michelangelo\'s unique standing, he was the first Western artist whose biography was published while he was alive. Two biographies were published of him during his lifetime; one of them, by Giorgio Vasari, proposed that he was the pinnacle of all artistic achievement since the beginning of the Renaissance, a viewpoint that continued to have currency in art history for centuries.</p> <p>In his lifetime he was also often called Il Divino ("the divine one"). One of the qualities most admired by his contemporaries was his terribilità, a sense of awe-inspiring grandeur, and it was the attempts of subsequent artists to imitate Michelangelo\'s impassioned and highly personal style that resulted in Mannerism, the next major movement in Western art after the High Renaissance.</p> '},
{name: 'PAUL GAUGUIN', years: '1848-1903', portrait: '13.jpg', style: 'Post-Impressionism', description: '<p>Eugène Henri Paul Gauguin (1848 – 1903) was a leading French Post-Impressionist artist who was not well appreciated until after his death. Gauguin was later recognized for his experimental use of colors and synthetist style that were distinguishably different from Impressionism. His work was influential to the French avant-garde and many modern artists, such as Pablo Picasso, and Henri Matisse. Gauguin’s art became popular after his death and many of his paintings were in the possession of Russian collector Sergei Shchukin. He was an important figure in the Symbolist movement as a painter, sculptor, print-maker, ceramist, and writer. His bold experimentation with coloring led directly to the Synthetist style of modern art, while his expression of the inherent meaning of the subjects in his paintings, under the influence of the cloisonnist style, paved the way to Primitivism and the return to the pastoral. He was also an influential proponent of wood engraving and woodcuts as art forms.</p> '},
{name: 'FRANCISCO DE GOYA', years: '1746-1828', portrait: '14.jpg', style: 'Romanticism', description: '<p>Francisco José de Goya y Lucientes (1746 – 1828) was a Spanish romantic painter and printmaker regarded both as the last of the Old Masters and the first of the moderns. Goya was a court painter to the Spanish Crown, and through his works was both a commentator on and chronicler of his era. The subversive imaginative element in his art, as well as his bold handling of paint, provided a model for the work of later generations of artists, notably Manet, Picasso and Francis Bacon.</p> '},
{name: 'VINCENT VAN GOGH', years: '1853-1890', portrait: '15.jpg', style: 'Post-Impressionism', description: '<p>Vincent Willem van Gogh (1853 – 1890) was a Dutch post-Impressionist painter whose work, notable for its rough beauty, emotional honesty and bold color, had a far-reaching influence on 20th-century art. After years of painful anxiety and frequent bouts of mental illness, he died aged 37 from a gunshot wound, generally accepted to be self-inflicted (although no gun was ever found).[note 2] His work was then known to only a handful of people and appreciated by fewer still.</p> <p>Van Gogh began to draw as a child, and he continued to draw throughout the years that led up to his decision to become an artist. He did not begin painting until his late twenties, completing many of his best-known works during the last two years of his life. In just over a decade, he produced more than 2,100 artworks, consisting of 860 oil paintings and more than 1,300 watercolors, drawings, sketches and prints. His work included self portraits, landscapes, still lifes, portraits and paintings of cypresses, wheat fields and sunflowers.</p> <p>Van Gogh spent his early adulthood working for a firm of art dealers, traveling between The Hague, London and Paris, after which he taught for a time in England. One of his early aspirations was to become a pastor and from 1879 he worked as a missionary in a mining region in Belgium where he began to sketch people from the local community. In 1885, he painted his first major work The Potato Eaters. His palette at the time consisted mainly of somber earth tones and showed no sign of the vivid coloration that distinguished his later work. In March 1886, he moved to Paris and discovered the French Impressionists. Later, he moved to the south of France and was influenced by the strong sunlight he found there. His work grew brighter in color, and he developed the unique and highly recognizable style that became fully realized during his stay in Arles in 1888.</p> <p>The extent to which his mental health affected his painting has been a subject of speculation since his death. Despite a widespread tendency to romanticize his ill health, modern critics see an artist deeply frustrated by the inactivity and incoherence brought about by his bouts of illness. According to art critic Robert Hughes, van Gogh\'s late works show an artist at the height of his ability, completely in control and "longing for concision and grace".</p> '},
{name: 'EDOUARD MANET', years: '1832-1883', portrait: '16.jpg', style: 'Realism, Impressionism', description: '<p>Édouard Manet (1832 – 1883) was a French painter. One of the first 19th-century artists to approach modern and postmodern-life subjects, he was a pivotal figure in the transition from Realism to Impressionism.</p> <p>His early masterworks, The Luncheon on the Grass (Le déjeuner sur l\'herbe) and Olympia, engendered great controversy and served as rallying points for the young painters who would create Impressionism. Today, these are considered watershed paintings that mark the genesis of modern art.</p> '},
{name: 'HENRI MATISSE', years: '1869-1954', portrait: '17.jpg', style: 'Fauvism, Modernism', description: '<p>Henri-Émile-Benoît Matisse (1869 – 1954) was a French artist, known for his use of colour and his fluid and original draughtsmanship. He was a draughtsman, printmaker, and sculptor, but is known primarily as a painter. Matisse is commonly regarded, along with Pablo Picasso and Marcel Duchamp, as one of the three artists who helped to define the revolutionary developments in the plastic arts in the opening decades of the 20th century, responsible for significant developments in painting and sculpture. Although he was initially labelled a Fauve (wild beast), by the 1920s he was increasingly hailed as an upholder of the classical tradition in French painting. His mastery of the expressive language of colour and drawing, displayed in a body of work spanning over a half-century, won him recognition as a leading figure in modern art.</p> '},
{name: 'EDVARD MUNCH', years: '1863-1944', portrait: '18.jpg', style: 'Expressionism', description: '<p>Edvard Munch (1863 – 1944) was a Norwegian painter and printmaker whose intensely evocative treatment of psychological themes built upon some of the main tenets of late 19th-century Symbolism and greatly influenced German Expressionism in the early 20th century. One of his most well-known works is The Scream of 1893.</p> <p>The Scream (Norwegian: Skrik) is the popular name given to each of four versions of a composition, created as both paintings and pastels, by the Expressionist artist Edvard Munch between 1893 and 1910. Der Schrei der Natur (The Scream of Nature) is the title Munch gave to these works, all of which show a figure with an agonized expression against a landscape with a tumultuous orange sky. The landscape in the background is the Oslofjord, viewed from Ekeberg, Oslo, Norway.</p> '},
{name: 'TITIAN', years: '1476-1576', portrait: '19.jpg', style: 'High Renaissance', description: '<p>Tiziano Vecelli or Tiziano Vecellio (c. 1488/1490 – 27 August 1576) known in English as Titian was an Italian painter, the most important member of the 16th-century Venetian school. He was born in Pieve di Cadore, near Belluno (in Veneto), in the Republic of Venice. During his lifetime he was often called da Cadore, taken from the place of his birth.</p> <p>Recognized by his contemporaries as "The Sun Amidst Small Stars" (recalling the famous final line of Dante\'s Paradiso), Titian was one of the most versatile of Italian painters, equally adept with portraits, landscape backgrounds, and mythological and religious subjects. His painting methods, particularly in the application and use of color, would exercise a profound influence not only on painters of the Italian Renaissance, but on future generations of Western art.</p> <p>During the course of his long life, Titian\'s artistic manner changed drastically but he retained a lifelong interest in color. Although his mature works may not contain the vivid, luminous tints of his early pieces, their loose brushwork and subtlety of polychromatic modulations are without precedent in the history of Western art.</p> '},
{name: 'PIET MONDRIAN', years: '1872-1944', portrait: '20.jpg', style: 'Neo-Plasticism', description: '<p>Pieter Cornelis "Piet" Mondriaan, after 1906 Mondrian (1872 – 1944) was a Dutch painter.</p> <p>He was an important contributor to the De Stijl art movement and group, which was founded by Theo van Doesburg. He evolved a non-representational form which he termed Neo-Plasticism. This consisted of white ground, upon which was painted a grid of vertical and horizontal black lines and the three primary colors.</p> <p>Between his 1905 painting, The River Amstel, and his 1907 Amaryllis, Mondrian changed the spelling of his signature from Mondriaan to Mondrian.</p> '},
{name: 'RAPHAEL', years: '1483-1520', portrait: '21.jpg', style: 'High Renaissance', description: '<p>Raffaello Sanzio da Urbino (1483 – 1520), better known simply as Raphael, was an Italian painter and architect of the High Renaissance. His work is admired for its clarity of form and ease of composition and for its visual achievement of the Neoplatonic ideal of human grandeur. Together with Michelangelo and Leonardo da Vinci, he forms the traditional trinity of great masters of that period.</p> <p>Raphael was enormously productive, running an unusually large workshop, and despite his death at 37, a large body of his work remains. Many of his works are found in the Apostolic Palace of The Vatican, where the frescoed Raphael Rooms were the central, and the largest, work of his career. The best known work is The School of Athens in the Vatican Stanza della Segnatura. After his early years in Rome much of his work was self-designed, but for the most part executed by the workshop from his drawings, with considerable loss of quality. He was extremely influential in his lifetime, though outside Rome his work was mostly known from his collaborative printmaking. After his death, the influence of his great rival Michelangelo was more widespread until the 18th and 19th centuries, when Raphael\'s more serene and harmonious qualities were again regarded as the highest models. His career falls naturally into three phases and three styles, first described by Giorgio Vasari: his early years in Umbria, then a period of about four years (from 1504–1508) absorbing the artistic traditions of Florence, followed by his last hectic and triumphant twelve years in Rome, working for two Popes and their close associates.</p> '},
{name: 'PETER PAUL RUBENS', years: '1577-1640', portrait: '22.jpg', style: 'Baroque', description: '<p>Sir Peter Paul Rubens (1577 – 1640), was a Flemish Baroque painter, and a proponent of an extravagant Baroque style that emphasised movement, colour, and sensuality. He is well known for his Counter-Reformation altarpieces, portraits, landscapes, and history paintings of mythological and allegorical subjects.</p> <p>In addition to running a large studio in Antwerp that produced paintings popular with nobility and art collectors throughout Europe, Rubens was a classically educated humanist scholar and diplomat who was knighted by both Philip IV, King of Spain, and Charles I, King of England.</p> '},
{name: 'JOAN MIRÓ', years: '1893-1983', portrait: '23.jpg', style: 'Surrealism', description: '<p>Joan Miró (1893 – 1983) was a Catalan painter, sculptor, and ceramicist born in Barcelona. A museum dedicated to his work, the Fundació Joan Miró, was established in his birth city in 1975.</p> <p>Earning international acclaim, his work has been interpreted as Surrealism, a sandbox for the subconscious mind, a re-creation of the childlike, and a manifestation of Catalan pride. In numerous interviews dating from the 1930s onwards, Miró expressed contempt for conventional painting methods as a way of supporting bourgeois society, and famously declared an "assassination of painting" in favour of upsetting the visual elements of established painting.</p> '},
{name: 'MARC CHAGALL', years: '1887-1985', portrait: '24.jpg', style: 'Modernism', description: '<p>Marc Zaharovich Chagall (1887 – 1985) was a Russian artist associated with several major artistic styles and one of the most successful artists of the 20th century. He was an early modernist, and created works in virtually every artistic medium, including painting, book illustrations, stained glass, stage sets, ceramic, tapestries and fine art prints.</p> <p>Art critic Robert Hughes referred to Chagall as "the quintessential Jewish artist of the twentieth century". According to art historian Michael J. Lewis, Chagall was considered to be "the last survivor of the first generation of European modernists". For decades, he "had also been respected as the world\'s preeminent Jewish artist". Using the medium of stained glass, he produced windows for the cathedrals of Reims and Metz, windows for the UN, and the Jerusalem Windows in Israel. He also did large-scale paintings, including part of the ceiling of the Paris Opéra.</p> <p>Before World War I, he traveled between St. Petersburg, Paris, and Berlin. During this period he created his own mixture and style of modern art based on his idea of Eastern European Jewish folk culture. He spent the wartime years in Soviet Belarus, becoming one of the country\'s most distinguished artists and a member of the modernist avante-garde, founding the Vitebsk Arts College before leaving again for Paris in 1922.</p> <p>He had two basic reputations, writes Lewis: as a pioneer of modernism and as a major Jewish artist. He experienced modernism\'s "golden age" in Paris, where "he synthesized the art forms of Cubism, Symbolism, and Fauvism, and the influence of Fauvism gave rise to Surrealism". Yet throughout these phases of his style "he remained most emphatically a Jewish artist, whose work was one long dreamy reverie of life in his native village of Vitebsk." "When Matisse dies," Pablo Picasso remarked in the 1950s, "Chagall will be the only painter left who understands what colour really is".</p> '},
{name: 'EUGENE DELACROIX', years: '1798-1863', portrait: '25.jpg', style: 'Romanticism', description: '<p>Ferdinand Victor Eugène Delacroix (1798 – 1863) was a French Romantic artist regarded from the outset of his career as the leader of the French Romantic school. Delacroix\'s use of expressive brushstrokes and his study of the optical effects of colour profoundly shaped the work of the Impressionists, while his passion for the exotic inspired the artists of the Symbolist movement. A fine lithographer, Delacroix illustrated various works of William Shakespeare, the Scottish writer Walter Scott and the German writer Johann Wolfgang von Goethe.</p> <p>In contrast to the Neoclassical perfectionism of his chief rival Ingres, Delacroix took for his inspiration the art of Rubens and painters of the Venetian Renaissance, with an attendant emphasis on colour and movement rather than clarity of outline and carefully modelled form. Dramatic and romantic content characterized the central themes of his maturity, and led him not to the classical models of Greek and Roman art, but to travel in North Africa, in search of the exotic. Friend and spiritual heir to Théodore Géricault, Delacroix was also inspired by Lord Byron, with whom he shared a strong identification with the "forces of the sublime", of nature in often violent action.</p> <p>However, Delacroix was given to neither sentimentality nor bombast, and his Romanticism was that of an individualist. In the words of Baudelaire, "Delacroix was passionately in love with passion, but coldly determined to express passion as clearly as possible."</p> '},
{name: 'WILLIAM BLAKE', years: '1757-1827', portrait: '26.jpg', style: 'Romanticism', description: '<p>William Blake (1757 – 1827) was an English poet, painter, and printmaker. Largely unrecognised during his lifetime, Blake is now considered a seminal figure in the history of the poetry and visual arts of the Romantic Age. His prophetic poetry has been said to form "what is in proportion to its merits the least read body of poetry in the English language". His visual artistry led one contemporary art critic to proclaim him "far and away the greatest artist Britain has ever produced". Although he lived in London his entire life except for three years spent in Felpham he produced a diverse and symbolically rich corpus, which embraced the imagination as "the body of God", or "Human existence itself".</p> <p>Considered mad by contemporaries for his idiosyncratic views, Blake is held in high regard by later critics for his expressiveness and creativity, and for the philosophical and mystical undercurrents within his work. His paintings and poetry have been characterised as part of the Romantic movement and "Pre-Romantic", for its large appearance in the 18th century. Reverent of the Bible but hostile to the Church of England – indeed, to all forms of organised religion – Blake was influenced by the ideals and ambitions of the French and American revolutions, as well as by such thinkers as Jakob Böhme and Emanuel Swedenborg. Despite these known influences, the singularity of Blake\'s work makes him difficult to classify. The 19th-century scholar William Rossetti characterised him as a "glorious luminary," and "a man not forestalled by predecessors, nor to be classed with contemporaries, nor to be replaced by known or readily surmisable successors".</p> '},
{name: 'JAN VERMEER', years: '1632-1675', portrait: '27.jpg', style: 'Baroque', description: '<p>Johannes, Jan or Johan Vermeer (1632 – 1675) was a Dutch painter who specialized in domestic interior scenes of middle class life. Vermeer was a moderately successful provincial genre painter in his lifetime. He seems never to have been particularly wealthy, leaving his wife and children in debt at his death, perhaps because he produced relatively few paintings.</p> <p>Vermeer worked slowly and with great care, using bright colours and sometimes expensive pigments, with a preference for cornflower blue and yellow. He is particularly renowned for his masterly treatment and use of light in his work.</p> <p>Vermeer painted mostly domestic interior scenes. "Almost all his paintings are apparently set in two smallish rooms in his house in Delft; they show the same furniture and decorations in various arrangements and they often portray the same people, mostly women".</p> <p>Recognized during his lifetime in Delft and The Hague, his modest celebrity gave way to obscurity after his death; he was barely mentioned in Arnold Houbraken\'s major source book on 17th-century Dutch painting (Grand Theatre of Dutch Painters and Women Artists), and was thus omitted from subsequent surveys of Dutch art for nearly two centuries. In the 19th century Vermeer was rediscovered by Gustav Friedrich Waagen and Théophile Thoré-Bürger, who published an essay attributing sixty-six pictures to him, although only thirty-four paintings are universally attributed to him today. Since that time Vermeer\'s reputation has grown, and he is now acknowledged as one of the greatest painters of the Dutch Golden Age.</p> '},
{name: 'EL GRECO', years: '1541-1614', portrait: '28.jpg', style: 'Mannerism', description: '<p>El Greco, born Doménikos Theotokópoulos, (1541 – 1614) was a painter, sculptor and architect of the Spanish Renaissance. "El Greco" (The Greek) was a nickname,[a][b] a reference to his national Greek origin, and the artist normally signed his paintings with his full birth name in Greek letters, Δομήνικος Θεοτοκόπουλος (Doménikos Theotokópoulos), often adding the word Κρής (Krēs, "Cretan").</p> <p>El Greco was born in Crete, which was at that time part of the Republic of Venice, and the center of Post-Byzantine art. He trained and became a master within that tradition before travelling at age 26 to Venice, as other Greek artists had done. In 1570 he moved to Rome, where he opened a workshop and executed a series of works. During his stay in Italy, El Greco enriched his style with elements of Mannerism and of the Venetian Renaissance. In 1577, he moved to Toledo, Spain, where he lived and worked until his death. In Toledo, El Greco received several major commissions and produced his best-known paintings.</p> <p>El Greco\'s dramatic and expressionistic style was met with puzzlement by his contemporaries but found appreciation in the 20th century. El Greco is regarded as a precursor of both Expressionism and Cubism, while his personality and works were a source of inspiration for poets and writers such as Rainer Maria Rilke and Nikos Kazantzakis. El Greco has been characterized by modern scholars as an artist so individual that he belongs to no conventional school. He is best known for tortuously elongated figures and often fantastic or phantasmagorical pigmentation, marrying Byzantine traditions with those of Western painting.</p> '},
{name: 'EDGAR DEGAS ', years: '1834-1917', portrait: '29.jpg', style: 'Impressionism', description: '<p>Edgar Degas (1834 – 1917), was a French artist famous for his paintings, sculptures, prints, and drawings. He is especially identified with the subject of dance; more than half of his works depict dancers. He is regarded as one of the founders of Impressionism, although he rejected the term, and preferred to be called a realist. He was a superb draftsman, and particularly masterful in depicting movement, as can be seen in his renditions of dancers, racecourse subjects and female nudes. His portraits are notable for their psychological complexity and for their portrayal of human isolation.</p> <p>At the beginning of his career, he wanted to be a history painter, a calling for which he was well prepared by his rigorous academic training and close study of classic art. In his early thirties, he changed course, and by bringing the traditional methods of a history painter to bear on contemporary subject matter, he became a classical painter of modern life.</p> '},
{name: 'SALVADOR DALÍ', years: '1904-1989', portrait: '30.jpg', style: 'Surrealism', description: '<p>Salvador Domingo Felipe Jacinto Dalí i Domènech, 1st Marqués de Dalí de Pubol (1904 – 1989), known as Salvador Dalí, was a prominent Spanish surrealist painter born in Figueres, Spain.</p> <p>Dalí was a skilled draftsman, best known for the striking and bizarre images in his surrealist work. His painterly skills are often attributed to the influence of Renaissance masters. His best-known work, The Persistence of Memory, was completed in 1931. Dalí\'s expansive artistic repertoire included film, sculpture, and photography, in collaboration with a range of artists in a variety of media.</p> <p>Dalí attributed his "love of everything that is gilded and excessive, my passion for luxury and my love of oriental clothes" to a self-styled "Arab lineage", claiming that his ancestors were descended from the Moors.</p> <p>Dalí was highly imaginative, and also enjoyed indulging in unusual and grandiose behavior. His eccentric manner and attention-grabbing public actions sometimes drew more attention than his artwork, to the dismay of those who held his work in high esteem, and to the irritation of his critics.</p> '},
{name: 'HIERONYMUS BOSCH', years: '1450-1516', portrait: '31.jpg', style: 'Early Renaissance', description: '<p>Hieronymus Bosch (born Jheronimus van Aken) (c. 1450 – 1516), was a Dutch painter. His work is known for its use of fantastic imagery to illustrate moral and religious concepts and narratives.</p> '},
{name: 'PIETER BRUEGEL', years: '1528-1569', portrait: '32.jpg', style: 'Renaissance', description: '<p>Pieter Bruegel (Brueghel) the Elder (1525 – 1569) was a Flemish Renaissance painter and printmaker known for his landscapes and peasant scenes (so called genre painting). He is sometimes referred to as the "Peasant Bruegel" to distinguish him from other members of the Brueghel dynasty, but he is also the one generally meant when the context does not make clear which Brueghel is being referred to. From 1559 he dropped the \'h\' from his name and signed his paintings as Bruegel.</p> '},
{name: 'HANS MEMLING', years: '1435-1494', portrait: '33.jpg', style: 'Early Netherlandish', description: '<p>Hans Memling (c. 1430 – 1494) was a German-born painter who moved to Flanders and worked in the tradition of Early Netherlandish painting. From the 1460s until the end of his life he became one of the leading artists, painting both portraits and several large religious works, continuing the style he learned in his youth from his masters such as Rogier van der Weyden.</p> '},
{name: 'AMEDEO MODIGLIANI', years: '1884-1920', portrait: '34.jpg', style: 'Modern', description: '<p>Amedeo Clemente Modigliani (1884 – 1920) was an Italian painter and sculptor who worked mainly in France. Primarily a figurative artist, he became known for paintings and sculptures in a modern style, characterized by mask-like faces and elongation of form. He died at age 35 in Paris of tubercular meningitis, exacerbated by poverty, overwork and addiction to alcohol and narcotics.</p> '},

];
return data[key];
}


﻿function itemDef(key){
	var data = new Array();
	//items
	data['names']=['PABLO PICASSO', 'GIOTTO DI BONDONE', 'LEONARDO DA VINCI', 'PAUL CÉZANNE', 'REMBRANDT VAN RIJN', 'DIEGO VELÁZQUEZ', 'WASSILY KANDINSKY', 'CLAUDE MONET', 'CARAVAGIGO', 'JOSEPH MALLORD WILLIAM TURNER', 'JAN VAN EYCK ', 'ALBRECHT DÜRER', 'MICHELANGELO BUONARROTI', 'PAUL GAUGUIN', 'FRANCISCO DE GOYA', 'VINCENT VAN GOGH', 'EDOUARD MANET', 'HENRI MATISSE', 'EDVARD MUNCH', 'TITIAN', 'PIET MONDRIAN', 'RAPHAEL', 'PETER PAUL RUBENS', 'JOAN MIRÓ', 'MARC CHAGALL', 'EUGENE DELACROIX', 'WILLIAM BLAKE', 'JAN VERMEER', 'EL GRECO', 'EDGAR DEGAS ', 'SALVADOR DALÍ', 'HIERONYMUS BOSCH', 'PIETER BRUEGEL THE ELDER', 'HANS MEMLING', 'AMEDEO MODIGLIANI'];
	data['years']=['1881-1973', '1267-1337', '1452-1519', '1839-1906', '1606-1669', '1599-1660', '1866-1944', '1840-1926', '1571-1610', '1775-1851', '1390-1441', '1471-1528', '1475-1564', '1848-1903', '1746-1828', '1853-1890', '1832-1883', '1869-1954', '1863-1944', '1476-1576', '1872-1944', '1483-1520', '1577-1640', '1893-1983', '1887-1985', '1798-1863', '1757-1827', '1632-1675', '1541-1614', '1834-1917', '1904-1989', '1450-1516', '1528-1569', '1435-1494', '1884-1920'];
	data['styles']=['Cubism', 'Late Middle Ages', 'High Renaissance', 'Post-Impressionism', 'Baroque', 'Expressionism', 'Impressionism', 'Romanticism', 'Early Renaissance', 'Renaissance', 'Realism / Impressionism', 'Fauvism / Modernism', 'Neo-Plasticism', 'Surrealism', 'Modernism', 'Mannerism', 'Early Netherlandish', 'Modern', 'Dutch Golden Age'];
	data['portraits'] = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg'];
	data['works'] = ['1a.jpg', '2a.jpg', '2b.jpg', '2c.jpg', '3a.jpg', '3b.jpg', '4a.jpg', '4b.jpg', '4c.jpg', '5a.jpg', '5b.jpg', '6a.jpg', '7a.jpg', '7b.jpg', '7c.jpg', '8a.jpg', '8b.jpg', '9a.jpg', '9b.jpg', '10a.jpg', '10b.jpg', '11a.jpg', '11b.jpg', '12a.jpg', '12b.jpg', '13a.jpg', '13b.jpg', '14a.jpg', '14b.jpg', '15a.jpg', '15b.jpg', '15c.jpg', '16a.jpg', '16b.jpg', '18a.jpg', '19a.jpg', '21a.jpg', '21b.jpg', '22a.jpg', '22b.jpg', '22c.jpg', '24a.jpg', '25a.jpg', '25b.jpg', '26a.jpg', '26b.jpg', '27a.jpg', '27b.jpg', '28a.jpg', '28b.jpg', '28c.jpg', '29a.jpg', '29b.jpg', '31a.jpg', '31b.jpg', '32a.jpg', '32b.jpg', '33a.jpg', '33b.jpg', '34a.jpg', '34b.jpg'];
	
	//game questions
	data['names-styles']=['0|0', '1|1', '2|2', '3|3', '4|18', '5|4', '6|5', '7|6', '8|4', '9|7', '10|8', '11|9', '12|2', '13|3', '14|7', '15|3', '16|10', '17|11', '18|5', '19|2', '20|12', '21|2', '22|4', '23|13', '24|14', '25|7', '26|7', '27|18', '28|15', '29|6', '30|13', '31|8', '32|9', '33|16', '34|17'];
	data['works-names']=['0|1', '1|2', '2|2', '3|2', '4|3', '5|3', '6|4', '7|4', '8|4', '9|5', '10|5', '11|6', '12|7', '13|7', '14|7', '15|8', '16|8', '17|9', '18|9', '19|10', '20|10', '21|11', '22|11', '23|12', '24|12', '25|13', '26|13', '27|14', '28|14', '29|15', '30|15', '31|15', '32|16', '33|16', '34|18', '35|19', '36|21', '37|21', '38|22', '39|22', '40|22', '41|24', '42|25', '43|25', '44|26', '45|26', '46|27', '47|27', '48|28', '49|28', '50|28', '51|29', '52|29', '53|31', '54|31', '55|32', '56|32', '57|33', '58|33', '59|34', '60|34'];
return data[key];
}

function feedback(gname,key){
	var fb = new Array();
	//feedbacks
	fb['Portraits'] = [
'Pablo Ruiz y Picasso, known as Pablo Picasso (25 October 1881 – 8 April 1973) was a Spanish painter, sculptor, printmaker, ceramicist, and stage designer who spent most of his adult life in France.',
'Giotto di Bondone (1266/7 – January 8, 1337), better known simply as Giotto, was an Italian painter and architect from Florence in the late Middle Ages. ',
'Leonardo di ser Piero da Vinci (April 15, 1452 – May 2, 1519, Old Style) was an Italian Renaissance polymath: painter, sculptor, architect, musician, mathematician, engineer, inventor, anatomist, geologist, cartographer, botanist, and writer. Leonardo has often been described as the archetype of the Renaissance Man, a man of "unquenchable curiosity" and "feverishly inventive imagination". He is widely considered to be one of the greatest painters of all time and perhaps the most diversely talented person ever to have lived.',
'Paul Cézanne (1839–1906) was a French artist and Post-Impressionist painter whose work laid the foundations of the transition from the 19th-century conception of artistic endeavour to a new and radically different world of art in the 20th century',
'Rembrandt Harmenszoon van Rijn (15 July 1606 – 4 October 1669) was a Dutch painter and etcher. He is generally considered one of the greatest painters and printmakers in European art history and the most important in Dutch history.',
'Diego Velázquez (1599 – 1660) was a Spanish painter who was the leading artist in the court of King Philip IV.',
'Wassily Kandinsky (1866 – 1944) was an influential Russian painter and art theorist',
'Claude Monet (14 November 1840 – 5 December 1926) was a founder of French impressionist painting, and the most consistent and prolific practitioner of the movement\'s philosophy of expressing one\'s perceptions before nature, especially as applied to plein-air landscape painting.',
'Michelangelo Merisi da Caravaggio (1571 – 1610) was an Italian artist active in Rome, Naples, Malta, and Sicily between 1593 and 1610.',
'Joseph Mallord William "J. M. W." Turner (23 April 1775 – 19 December 1851) was a British Romantic landscape painter, water-colourist, and printmaker.',
'Jan van Eyck (or Johannes de Eyck) (c. 1390 – 1441) was a Flemish painter active in Bruges and is generally considered one of the most significant Northern European painters of the 15th century.',
'Albrecht Dürer (1471 – 1528) was a German painter, engraver, printmaker, mathematician, and theorist from Nuremberg.',
'Michelangelo di Lodovico Buonarroti Simoni (1475 – 1564), commonly known as Michelangelo, was an Italian Renaissance sculptor, painter, architect, poet, and engineer who exerted an unparalleled influence on the development of Western art.',
'Paul Gauguin (1848 – 1903) was a leading French Post-Impressionist artist who was not well appreciated until after his death.',
'Francisco de Goya (1746 – 1828) was a Spanish romantic painter and printmaker regarded both as the last of the Old Masters and the first of the moderns.',
'Vincent Willem van Gogh (1853 – 1890) was a Dutch post-Impressionist painter. After years of painful anxiety and frequent bouts of mental illness, he died aged 37. His work was then known to only a handful of people and appreciated by fewer still. Today van Gogh\'s paintings are among the most valuable ones.',
'Édouard Manet (1832 – 1883) was a French painter. One of the first 19th-century artists to approach modern and postmodern-life subjects, he was a pivotal figure in the transition from Realism to Impressionism.',
'Henri Matisse (1869 – 1954) was a French artist, known for his use of colour and his fluid and original draughtsmanship. He was a draughtsman, printmaker, and sculptor, but is known primarily as a painter.',
'Edvard Munch (1863 – 1944) was a Norwegian painter and printmaker.',
'Titian was an Italian painter, the most important member of the 16th-century Venetian school.',
'Piet Mondrian (1872 – 1944) was a Dutch painter.',
'Raphael (1483 – 1520) was an Italian painter and architect of the High Renaissance. Together with Michelangelo and Leonardo da Vinci, he forms the traditional trinity of great masters of that period.',
'Peter Paul Rubens (1577 – 1640), was a Flemish Baroque painter. He is well known for his Counter-Reformation altarpieces, portraits, landscapes, and history paintings of mythological and allegorical subjects.',
'Joan Miró (1893 – 1983) was a Catalan painter, sculptor, and ceramicist born in Barcelona.',
'Marc Zaharovich Chagall (1887 – 1985) was a Russian artist associated with several major artistic styles and one of the most successful artists of the 20th century.',
'Eugène Delacroix (1798 – 1863) was a French Romantic artist',
'William Blake (1757 – 1827) was an English poet, painter, and printmaker.',
'Jan Vermeer (1632 – 1675) was a Dutch painter who specialized in domestic interior scenes of middle class life.',
'El Greco (1541 – 1614) was a painter, sculptor and architect of the Spanish Renaissance. ',
'Edgar Degas (1834 – 1917), was a French artist famous for his paintings, sculptures, prints, and drawings. ',
'Salvador Dalí (1904 – 1989), was a prominent Spanish surrealist painter born in Figueres, Spain.',
'Hieronymus Bosch (born Jheronimus van Aken) (c. 1450 – 1516), was a Dutch painter',
'Pieter Bruegel (Brueghel) the Elder (1525 – 1569) was a Flemish Renaissance painter.',
'Hans Memling (c. 1430 – 1494) was a German-born painter who moved to Flanders and worked in the tradition of Early Netherlandish painting.',
'Modigliani (1884 – 1920) was an Italian painter and sculptor who worked mainly in France. '
	];
	
	fb['Styles'] = [
'As one of the greatest and most influential artists of the 20th century, Picasso is widely known for co-founding the Cubist movement, the invention of constructed sculpture, the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Analytic cubism (1909–1912) is a style of painting Picasso developed along with Georges Braque using monochrome brownish and neutral colors.',
'Giotto was a painter in the late Middle Ages, and he is also considered the first in a line of great artists who contributed to the Italian Renaissance.',
'Da Vinci introduced aerial perspective to many of his paintings such as the Mona Lisa and The Last Supper. ',
'Cézanne can be said to form the bridge between late 19th-century Impressionism and the early 20th century\'s new line of artistic enquiry, Cubism. The line attributed to both Matisse and Picasso that Cézanne "is the father of us all" cannot be easily dismissed.',
'His contributions to art came in a period of great wealth and cultural achievement that historians call the Dutch Golden Age when Dutch Golden Age painting, although in many ways antithetical to the Baroque style that dominated Europe, was extremely prolific and innovative.',
'He was an individualistic artist of the contemporary Baroque period, important as a portrait artist.',
'He is credited with painting the first purely abstract works.',
'The term Impressionism is derived from the title of his painting Impression, Sunrise (Impression, soleil levant).',
'His paintings, which combine a realistic observation of the human state, both physical and emotional, with a dramatic use of lighting, had a formative influence on the Baroque school of painting.',
'Although renowned for his oil paintings, Turner is also one of the greatest masters of British watercolour landscape painting. He is commonly known as "the painter of light" and his work is regarded as a Romantic preface to Impressionism. The influential English art critic John Ruskin described him as the artist who could most "stirringly and truthfully measure the moods of Nature."',
'His revolutionary approach to oil was such that a myth, perpetuated by Giorgio Vasari, arose that he had invented oil painting. It is known from historical record that van Eyck was considered a revolutionary master across northern Europe within his lifetime; his designs and methods were heavily copied and reproduced.',
'His high-quality woodcuts (nowadays often called Meisterstiche or "master prints") established his reputation and influence across Europe when he was still in his twenties, and he has been conventionally regarded as the greatest artist of the Northern Renaissance ever since.',
'Two of his best-known works, the Pietà and David, were sculpted before he turned thirty. Despite his low opinion of painting, Michelangelo also created two of the most influential works in fresco in the history of Western art: the scenes from Genesis on the ceiling and The Last Judgment on the altar wall of the Sistine Chapel in Rome.',
'Gauguin was recognized for his experimental use of colors and synthetist style that were distinguishably different from Impressionism. His work was influential to the French avant-garde and many modern artists, such as Pablo Picasso, and Henri Matisse.',
'The subversive imaginative element in his art, as well as his bold handling of paint, provided a model for the work of later generations of artists, notably Manet, Picasso and Francis Bacon.',
'Vincent van Gogh (1853 – 1890) was a Dutch post-Impressionist painter whose work, notable for its rough beauty, emotional honesty and bold color, had a far-reaching influence on 20th-century art.',
'His early masterworks, The Luncheon on the Grass (Le déjeuner sur l\'herbe) and Olympia, engendered great controversy and served as rallying points for the young painters who would create Impressionism. Today, these are considered watershed paintings that mark the genesis of modern art.',
'Matisse is commonly regarded, along with Pablo Picasso and Marcel Duchamp, as one of the three artists who helped to define the revolutionary developments in the plastic arts in the opening decades of the 20th century, responsible for significant developments in painting and sculpture.',
'Edvard Munch was a painter whose intensely evocative treatment of psychological themes built upon some of the main tenets of late 19th-century Symbolism and greatly influenced German Expressionism in the early 20th century.',
'Titian was one of the most versatile of Italian painters, equally adept with portraits, landscape backgrounds, and mythological and religious subjects. His painting methods, particularly in the application and use of color, would exercise a profound influence not only on painters of the Italian Renaissance, but on future generations of Western art.',
'He was an important contributor to the De Stijl art movement and group, which was founded by Theo van Doesburg. He evolved a non-representational form which he termed Neo-Plasticism. This consisted of white ground, upon which was painted a grid of vertical and horizontal black lines and the three primary colors.',
'Raphael was an Italian painter and architect of the High Renaissance. His work is admired for its clarity of form and ease of composition and for its visual achievement of the Neoplatonic ideal of human grandeur. ',
'Peter Paul Rubens was a Baroque painter, a proponent of an extravagant Baroque style that emphasised movement, colour, and sensuality. ',
'His work has been interpreted as Surrealism, a sandbox for the subconscious mind, a re-creation of the childlike, and a manifestation of Catalan pride.',
'He was an early modernist, and created works in virtually every artistic medium, including painting, book illustrations, stained glass, stage sets, ceramic, tapestries and fine art prints.',
'Eugène Delacroix was a French Romantic artist regarded from the outset of his career as the leader of the French Romantic school. Delacroix\'s use of expressive brushstrokes and his study of the optical effects of colour profoundly shaped the work of the Impressionists, while his passion for the exotic inspired the artists of the Symbolist movement.',
'Blake is held in high regard by later critics for his expressiveness and creativity, and for the philosophical and mystical undercurrents within his work. His paintings and poetry have been characterised as part of the Romantic movement. The singularity of Blake\'s work makes him difficult to classify.',
'Vermeer worked slowly and with great care, using bright colours and sometimes expensive pigments, with a preference for cornflower blue and yellow. He is particularly renowned for his masterly treatment and use of light in his work.',
'El Greco was a painter, sculptor and architect of the Spanish Renaissance. El Greco\'s dramatic and expressionistic style was met with puzzlement by his contemporaries but found appreciation in the 20th century. El Greco is regarded as a precursor of both Expressionism and Cubism. He is best known for tortuously elongated figures and often fantastic or phantasmagorical pigmentation, marrying Byzantine traditions with those of Western painting.',
'He is regarded as one of the founders of Impressionism, although he rejected the term, and preferred to be called a realist. He is especially identified with the subject of dance; more than half of his works depict dancers.',
'Dalí was a skilled draftsman, best known for the striking and bizarre images in his surrealist work. Dalí\'s expansive artistic repertoire included film, sculpture, and photography, in collaboration with a range of artists in a variety of media.',
'His work is known for its use of fantastic imagery to illustrate moral and religious concepts and narratives.',
'Pieter Bruegel the Elder was a Flemish Renaissance painter and printmaker known for his landscapes and peasant scenes (so called genre painting).',
'Memling worked in the tradition of Early Netherlandish painting. From the 1460s until the end of his life he became one of the leading artists, painting both portraits and several large religious works, continuing the style he learned in his youth from his masters such as Rogier van der Weyden.',
'Modigliani was primarily a figurative artist. He became known for paintings and sculptures in a modern style, characterized by mask-like faces and elongation of form.'
	];
	
	fb['Works'] = [
'The Kiss of Judas (1305), Scrovegni Chapel in Padua, Italy',
'The Mona Lisa (La Gioconda) is portrait which has been acclaimed as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world." (c.1503-1519), Musée du Louvre, Paris, France',
'The Last Supper (1495–1498), Santa Maria delle Grazie, Milan, Italy',
'Vitruvian Man, c. 1490, Gallerie dell\'Accademia in Venice, Italy. The drawing and text are sometimes called the Canon of Proportions.',
'The Card Players (1894–1895), Musée d\'Orsay, Paris, France',
'Mont Sainte-Victoire seen from Bellevue (c. 1885), Barnes Foundation, Pennsylvania, USA',
'The Anatomy Lesson of Dr. Nicolaes Tulp (1632), Mauritshuis, The Hague, The Netherlands',
'Danaë (1636), Hermitage Museum, St. Petersburg, Russia',
'De Nachtwacht (The Night Watch) (1642), Rijksmuseum, Amsterdam, The Netherlands',
'Las Meninas (1656), Museo del Prado, Madrid',
'Rokeby Venus (c. 1647–51), National Gallery, London.',
'Composition VII (1913), The Tretyakov Gallery, Moscow.',
'Impression, Sunrise (Impression, soleil levant), 1872, Musée Marmottan Monet, Paris',
'Rouen Cathedral, Full Sunlight, 1894, Musée d\'Orsay, Paris, France.',
'Wheatstacks (End of Summer), 1890-91, Art Institute of Chicago',
'The Entombment of Christ, (1602–1603), Pinacoteca Vaticana, Rome.',
'Nativity with St. Francis and St. Lawrence, 1609, Church of San Lorenzo Palermo, Italy, stolen in 1969',
'Newnham-on-Severn from Dean Hill, Gloucester City Museum & Art Gallery',
'Chichester Canal, 1828, Tate Collection, London',
'Virgin and Child with Canon van der Paele, 1434-36, Groeningemuseum, Bruges.',
'Annunciation, 1434-1436, National Gallery of Art, Washington',
'Knight, Death and the Devil (1513). Copper engraving, Multiple museum collections',
'Adam and Eve, 1507, Museo del Prado, Madrid',
'The Creation of Adam, 1512, Sistine Chapel, Vatican City',
'The Last Judgment, 1537-1541, Sistine Chapel, Vatican City',
'I Raro te Oviri, 1891, Dallas Museum of Art',
'Tahitian Women on the Beach, 1891, Musée d\'Orsay, Paris',
'The Third of May 1808, (1814). Museo del Prado, Madrid',
'The Nude Maja, ca. 1800, Museo del Prado, Madrid',
'The Starry Night (1889), Museum of Modern Art, New York City',
'Sunflowers (1888), National Gallery, London',
'Bedroom in Arles (1888), Van Gogh Museum, Amsterdam',
'The Luncheon on the Grass, 1862–1863, Musée d\'Orsay, Paris',
'Olympia, 1863, Musée d\'Orsay, Paris',
'The Scream (1893), National Gallery, Oslo, Norway',
'Assumption of the Virgin, 1516–1518, Basilica di Santa Maria Gloriosa dei Frari, Venice',
'Madonna del prato (1505), Kunsthistorisches Museum, Vienna',
'Sistine Madonna (1513–1514), Gemäldegalerie Alte Meister, Dresden',
'The Three Graces, 1635, Museo del Prado, Madrid',
'The Massacre of the Innocents, c. 1611. Art Gallery of Ontario',
'The Judgment of Paris, 1639, Museo del Prado',
'Orphée, 1913',
'Liberty Leading the People (1830), Louvre-Lens',
'Greece on the Ruins of Missolonghi (1826), Musée des Beaux-Arts, Bordeaux',
'The Night of Enitharmon\'s Joy, 1795, Tate Gallery, London',
'The Lovers\' Whirlwind (1824 - 1827), Birmingham Museum and Art Gallery',
'The Milkmaid (c. 1658), Rijksmuseum, Amsterdam, Netherlands',
'The Astronomer (c. 1668), Musée du Louvre, Paris',
'The Burial of the Count of Orgaz, 1586, Santo Tomé, Toledo, Spain',
'Portrait of Jorge Manuel Theotocopoulos (1600–1605), Museo Provincial de Bellas Artes, Seville',
'The Opening of the Fifth Seal (1608–1614), Metropolitan Museum, New York.',
'The Dance Class (La Classe de Danse),1873–1876, Musée d\'Orsay',
'Waiting (1882), Musee d\'Orsay, Paris.',
'The Garden of Earthly Delights (detail) (1490-1510), Museo del Prado in Madrid',
'The Hermit Saints Triptych (1493-1499), Doge\'s Palace, Venice',
'Hunters in the Snow (Winter), 1565, Kunsthistorisches Museum, Vienna, Austria',
'Tower of Babel (1563), Kunsthistorisches Museum, Vienna, Austria',
'Last Judgement, Triptych, 1466-1473, National Museum, Gdańsk, Poland',
'The Virgin and Child between St James and St Dominic, 1485-1490, Louvre Museum, Paris',
'Portrait of Juan Gris, 1915, Metropolitan Museum of Art, New York City, United States',
'Jacques and Berthe Lipchitz., 1916, Art Institute of Chicago'
	];
	
	if (typeof(fb[gname])=='undefined'){
		return '';
	}else{
		c='';
		//c+='Correct!<br>';
		c+=fb[gname][key];
		return c;
	}
}






//games definition
function gameDef(key){
	//'fullMatch' or name of data array
	var data = new Array();
	data = [
	{name: 'Portraits', dataName:'fullMatch', questionBank:'portraits', answerBank:'names', questionType:'picture'},
	{name: 'Years', dataName:'fullMatch', questionBank:'names', answerBank:'years', answerType:'dates', feedback:'no'},
	{name: 'Styles', dataName:'names-styles', questionBank:'names', answerBank:'styles', questionType:'textWithThumb'},
	{name: 'Works', dataName:'works-names', questionBank:'works', answerBank:'names', questionType:'picture'}
	];
	
	if (key=='listNames'){
		var out=new Array();
		for (var i=0;i<data.length;i++){
			out[i]=data[i].name;
		}
	}else {
		var out = data[key];
	}
return out;
}


//array shuffle - Fisher-Yates algorithm
function shuffle(myArray) {
    var i = myArray.length;
    if (i == 0) return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}

//progress Bar
function progressBar(nr,itemsCount) {
    //var counter = nr + '/' + itemsCount;
    var SCALE = 80 / itemsCount;
    var cDone = '<img src="../../images/white.png" height="8" width="' + SCALE * nr + '" />';
    var cToDo = '<img src="../../images/lightgrey.png" height="8" width="' + SCALE * (itemsCount - nr) + '" />';
    var c = cDone + cToDo;
    return c;
}

//lifes
function lifeBar(score, gameLength, levelId) {
    var c = '';
	if (levelId==1){
		for (var i=0;i<(score);i++){
			c+='<img src="../../images/heart-wh.png" height="16"> ';
		}
	}else{
		var itemsDone = Number(localStorage.getItem('EUESPOTW_It'));
		var errors = gameLength - score;
		var corrects = itemsDone - errors;
		c+='<img src="../../images/correct.png" height="30" />'+corrects+' &nbsp; <img src="../../images/wrong.png" height="30" />&nbsp;'+errors;
	}
    return c;
}

//lifes
function levelPracticeScore(score, gameLength) {
    var c = '';
	var itemsDone = Number(localStorage.getItem('EUESPOTW_It'));
	var errors = gameLength - score;
	var corrects = itemsDone - errors;
	c+='<img src="../../images/correct.png" height="30" />'+corrects+' &nbsp; <img src="../../images/wrong.png" height="30" />&nbsp;'+errors;
return c;
}

//save score
function saveScore(currScore, id, liveLevel) {
	var recordStor = localStorage.getItem('EUESPOTW_Record'+id);
	var recordsSplit = recordStor.split('|');
	localStorage.setItem(('EUESPOTW_Record' + id),currScore+'|'+liveLevel);
}

	function gameModeMsg(lvId,page){
		var c='You are in: ';
		if (page=='index'){var folder = 'images/';}
		else {var folder = '../../images/';}
		if (lvId==0){
			c+= '<img src="'+folder+'correct.png" height="16" /> LEARN mode';
		}else {
			c+= lifeNumber(folder)+' GAME mode';
		}
		return c;
	}
	
	function lifeNumber(folder){
		var liveCount = localStorage.getItem('EUESPOTW_Live');
		var c='';
		for (var i=0;i<Number(liveCount);i++){
			c+='<img src="'+folder+'heart-wh.png" width="16" height="16" align="absmiddle" />';
		}
		if (Number(liveCount)>1){
			c+=' EASY';
		}else {c+=' ADVANCE';}
		return c;
	}	

	
function label(key){
    var msg = new Array();

    //komunikaty
    msg['gameend-norecord'] = ['No record... Try again.', 'Bez rekordu... Spr�buj ponownie.', 'Il n\'ya pas de record... Essayez a nouveau', 'No hay r�cord... Int�ntelo de nuevo.', 'Non vi e record del gioco... Riprovare.', 'Kein Rekord... Wiederholen'];
    msg['gamerecord'] = ['<span class="blink">You have Game Record!</span>','<span class="blink">Masz rekord!</span>','<span class="blink">Record du Jeu!</span>','<span class="blink">Juego Record!</span>','<span class="blink">Gioco Record!</span>','<span class="blink">Spiel Rekord!</span>'];
	
	
	var langId = localStorage.getItem('EUESPOTW_Lang');
    if (typeof(msg[key][langId])=="undefined"){
        return msg[key][0];
    }else{
        return msg[key][langId];
    }
}

function langItems(key){
	return;
}


function toStaticHTML(str){
return str;
}


function level(key){
	var levels = new Array();
	levels = ['Practice','Game'];
	return levels[key];
}


/*
function clickPlay(soundSrc) {
    var audtag = document.createElement('audio');
    audtag.autoplay = true;
    var source= document.createElement('source');
    source.type= 'audio/wav';
    source.src= '/sounds/' + soundSrc;
    audtag.appendChild(source);
    source= document.createElement('source');
    source.type= 'audio/mp3';
    source.src= '/sounds/' + soundSrc;
    audtag.appendChild(source);
}
*/





function initPage(){
	displayToc();
}	

function buttonHandler(eventInfo) {
	eventInfo.preventDefault();
	var button = eventInfo.currentTarget;
	if (button.name='close'){window.location.assign(button.value);}
}

function displayToc() {
	var i=0;
	var str='';
	var items = new Array(); 
	while (typeof(desc(i))!=='undefined'){
		items[i] = desc(i).name+'|'+i;
		i++;
	}
	items.sort();
	for (var i=0;i<items.length;i++){
		var splitVals = items[i].split('|');
		str += '<button onclick=displayFacts('+splitVals[1]+');>'+splitVals[0]+'</button>';
	}
	document.getElementById("list").innerHTML = str;
	document.getElementById("description").innerHTML = '';
	return;
}

function displayFacts(key) {
	var item = desc(key);
	var str='';
	str+='<h1>'+item.name+'</h1>';
	str+='<h3>'+item.years+' / '+item.style+'</h3>';
	str+='<img src="../../images-portraits/'+key+'.jpg" />';
	str+='<div class="desc">'+item.description+'</div>';
	//str+='<p><strong>Population: </strong>'+item.population+' (world: '+item.prank+')</p>';
	document.getElementById("list").innerHTML = '<button onclick=displayToc();><</button>';
	document.getElementById("description").innerHTML = str;
	document.getElementById("close").value = 'facts.html';
	return;
}






$("button").click(buttonHandler);
initPage();


function initPage(){
		//ini
        displayPage();
}

    function buttonHandler(eventInfo) {
        eventInfo.preventDefault();
        var button = eventInfo.currentTarget;
        window.location.assign(button.value);
    }

    function displayPage() {
		//retrieve globals
		var itemNr = Number(localStorage.getItem('EUESPOTW_It'));
		var itemsDone = itemNr;
		var counter = Number(localStorage.getItem('EUESPOTW_Counter'));
		var quizId = localStorage.getItem('EUESPOTW_Qid');
		var levelId = localStorage.getItem('EUESPOTW_Level');
		var liveLevel = localStorage.getItem('EUESPOTW_Live');
		var gameLength = localStorage.getItem('EUESPOTW_QuizLength');		
        //displayPage
		if (levelId==0){//practice mode
			document.getElementById("scoreCount").innerHTML = 'Score<br/>'+levelPracticeScore(counter,gameLength,0);
			document.getElementById("headerTxt").innerHTML = gameDef(quizId).name.toUpperCase();
		}else{//game mode
			var itemsCorrect = itemsDone - (liveLevel-counter);//score = itemsDone minus lives lost during game
			var scoreInfo = scoreTracking(itemsCorrect);
			document.getElementById("trophy").innerHTML = trophyHTML(scoreInfo);
			document.getElementById("scoreCount").innerHTML = 'Score<br/>'+itemsCorrect;
			document.getElementById("scoreMsg").innerHTML = label(scoreInfo);
			document.getElementById("headerTxt").innerHTML = gameDef(quizId).name.toUpperCase();
		}
		document.getElementById("settings").innerHTML = gameModeMsg(levelId);
	}

    function scoreTracking(itemsSolved) {
		//retrieve globals
		var liveLevel = localStorage.getItem('EUESPOTW_Live');
		var qid = localStorage.getItem('EUESPOTW_Qid');
		var recordStor = localStorage.getItem('EUESPOTW_Record'+qid);
		var recordSplit = recordStor.split('|');
        var output = '';var isrecord=false;
		if (liveLevel>recordSplit[1] && itemsSolved>0){isrecord=true;}
		else if (liveLevel==recordSplit[1] && itemsSolved>recordSplit[0]){isrecord=true;}
		if (isrecord) {
			output = 'gamerecord';
			saveScore(itemsSolved, qid, liveLevel);
		} else {output = 'gameend-norecord';}
    return output;
    }

	//trophy
	function trophyHTML(key){
		var trophy = new Array;
		trophy['gameend-norecord'] = '';
		trophy['mid-norecord'] = '';
		trophy['inrecordtrack'] = '<img src="../../images/inrecordtrack.png" height="50" />';
		trophy['midrecord'] = '<img src="../../images/100px-star-gold.png" height="100" />';
		trophy['gamerecord'] = '<img src="../../images/trophy.png" height="200" />';
		return trophy[key];
	}






$("button").click(buttonHandler);
initPage();


    function buttonHandler(eventInfo) {
        eventInfo.preventDefault();
        var button = eventInfo.currentTarget;
        /*if (button.name == "lang") {
			//save lang
			localStorage.setItem('EUESPOTW_Lang', button.value);
		}else*/
		if (button.name == "learnMode"){
			//save mode
			localStorage.setItem('EUESPOTW_Level', 0);
		}else if (button.name == "gameMode"){
			//save life
			localStorage.setItem('EUESPOTW_Level', 1);
			localStorage.setItem('EUESPOTW_Live', button.value);
		}/*else if (button.name == "feedbackMode"){
			//save feedback mode
			localStorage.setItem('EUESPOTW_FeedbackMode', button.value);
		}*/
		window.location.assign('../../index.html');
    }

    function displayPage() {
		//retrieve lang ID and display
		//var langId = localStorage.getItem('EUESPOTW_Lang');
		//document.getElementById("hdrTxt").innerHTML = lang('Settings').toUpperCase();
    }






	$("button").click(buttonHandler);
	displayPage();


function initPage(){
	//Retrieve lang setting from local storage
	/*var langId = localStorage.getItem('EUESPOTW_Lang');
	if (!langId) {
		localStorage.setItem('EUESPOTW_Lang', 0);
	}*/
	//Retrieve level setting from local storage
	var levelId = localStorage.getItem('EUESPOTW_Level');
	if (!levelId) {
		levelId = 0;
		localStorage.setItem('EUESPOTW_Level', levelId);
	}
	//Retrieve lives setting from local storage
	var liveLevel = localStorage.getItem('EUESPOTW_Live');
	if (!liveLevel) {
		liveLevel = 5;
		localStorage.setItem('EUESPOTW_Live', liveLevel);
	}
	//Retrieve feedback settings from local storage
	/*var feedbackMode = localStorage.getItem('EUESPOTW_FeedbackMode');
	if (typeof(feedbackMode)=='undefined') {
		localStorage.setItem('EUESPOTW_FeedbackMode', 1);//default with feedbacks
	}*/
	
	//ini records
	var GAMECOUNT = gameDef('listNames').length;
	for (var i=0;i<GAMECOUNT;i++){
		var recordStor = localStorage.getItem('EUESPOTW_Record'+i);
		if (!recordStor) {
			localStorage.setItem(('EUESPOTW_Record' + i),'0|0');
		}
	}

	// Default values
	localStorage.setItem('EUESPOTW_It', 0);
	localStorage.setItem('EUESPOTW_QuizLength', 0);
	displayPage();
}	

    function buttonHandler(eventInfo) {
        eventInfo.preventDefault();
        var button = eventInfo.currentTarget;
		if (button.name == 'game'){
			localStorage.setItem('EUESPOTW_Qid', button.value);
			window.location.assign('./pages/quizPage/quizPage.html');
		}else {
			window.location.assign(button.value);
		}
    }

    function displayPage() {
		var levelId = localStorage.getItem('EUESPOTW_Level');
		document.getElementById("settings").innerHTML = gameModeMsg(levelId,'index');
    }
	

	


function initPage(){	

		//ini and shuffle question items
		var quizId = localStorage.getItem('EUESPOTW_Qid');
		var setCodes = getItemSet(quizId);
		shuffle(setCodes);
		localStorage.setItem('EUESPOTW_QuizItems',setCodes);
		
		//game Length
		var gameLength = setCodes.length;
		localStorage.setItem('EUESPOTW_QuizLength',gameLength);
		
		//Number of lives
		var levelId = Number(localStorage.getItem('EUESPOTW_Level'));
		var maxLives = new Number;
		if (levelId==1){
			maxLives= Number(localStorage.getItem('EUESPOTW_Live'));
		}else {
			maxLives = gameLength;
		}		
		localStorage.setItem('EUESPOTW_Counter', maxLives);
		
		//display page
		displayQuestion();
		
}    

    function buttonHandler(eventInfo) {
        eventInfo.preventDefault();
        var button = eventInfo.currentTarget;
        if (button.name == "correct") {
            //clickPlay('tada.wav');
            markCorrect(button);
            check(1);
        } else if (button.name == "wrong") {//input name="wrong"
            //clickPlay('hmmm.wav');
            markWrong(button);
            check(0);
		} else if (button.name == "next") {
			displayQuestion();
		}else {
			window.location.assign(button.value);
		}
    }

    function displayQuestion() {
        //SETTINGS
        MAXWRONG=2;//number of wrong answers

        //INI
        var itemKey = Number(localStorage.getItem('EUESPOTW_It'));
		var itemCounter = itemKey + 1;
		var counter = Number(localStorage.getItem('EUESPOTW_Counter'));
		var quizId = localStorage.getItem('EUESPOTW_Qid');
        var setCodesString = localStorage.getItem('EUESPOTW_QuizItems');
		var setCodes = setCodesString.split(',');
		var gameLength = localStorage.getItem('EUESPOTW_QuizLength');
        localStorage.setItem('EUESPOTW_SecondTry',false);
		var levelId = localStorage.getItem('EUESPOTW_Level');		

		//items values
		var itemSplit = setCodes[itemKey].split('|');
		
		//code of question item
		var questionIx = itemSplit[0];

		//answers set
		var answers = new Array();

		//code of correct item
		var correctIx = itemSplit[1];
		localStorage.setItem('EUESPOTW_QuestionIx',questionIx);
		answers[0] = ['correct',correctIx];

		//codes of wrong items
		if (itemSplit.length>2){//wrong answer defined in data
			for (var i=2;i<(itemSplit.length);i++){
				answers[(i-1)] = itemSplit[i];
			}
		}else {//wrong answers random from answerBank
			var answerBankLength = itemDef(gameDef(quizId).answerBank).length;
			var tmpArr = new Array();
			for (var i=0;i<answerBankLength;i++){
				tmpArr[i]=i;
			}
			tmpArr.splice(correctIx,1);
			shuffle(tmpArr);
			for (var i=0;i<MAXWRONG;i++){
				answers[(i+1)] = ['wrong',tmpArr[i]];
			}
		}


		
        //quiz HTML

        //questioning
		document.getElementById("questioning").innerHTML = getQuestionHTML(quizId,questionIx);

        //answers
        shuffle(answers);
		document.getElementById("answerSet").innerHTML = getAnswerSetHTML(quizId,answers);
		
		//close Button
		if (levelId==0){
			document.getElementById("closeButton").value = '../../pages/levelPage/levelPage.html';
		}else{
			document.getElementById("closeButton").value = '../../index.html';
		}
		
		
		
		//ini feedback
		document.getElementById("feedback").innerHTML = '';
		document.getElementById("nextButton").disabled = true;
	
        //name and counters 
		document.getElementById("quizName").innerHTML = gameDef(quizId).name.toUpperCase()+': '+itemCounter+'/'+gameLength;
        document.getElementById("progressBar").innerHTML = progressBar(itemCounter,gameLength);
		document.getElementById("scoreBar").innerHTML = lifeBar(counter,gameLength,levelId);
		
		$("button").click(buttonHandler);
    }

    function check(userInputValue) {
		//INI
		//retrieve globals
		var counter = Number(localStorage.getItem('EUESPOTW_Counter'));
		var questionIx = localStorage.getItem('EUESPOTW_QuestionIx');
		var itemKey = Number(localStorage.getItem('EUESPOTW_It'));
		var itemCounter = itemKey + 1;
		var secondTry = localStorage.getItem('EUESPOTW_SecondTry');
		var quizId = localStorage.getItem('EUESPOTW_Qid');
		var gameLength = localStorage.getItem('EUESPOTW_QuizLength');
		var levelId = localStorage.getItem('EUESPOTW_Level');
		
		//check end of items
        if (userInputValue == 1) {//right answer
			//feedback
			itemKey++;
			localStorage.setItem('EUESPOTW_It',itemKey);
            if (counter == 0 || itemCounter==gameLength) {//quiz completed
				if (levelId==0 && gameDef(quizId).feedback!='no'){
					document.getElementById("feedback").innerHTML = '<div style="padding:5px;text-align:left;">'+feedback(gameDef(quizId).name, questionIx)+'</div>';
					document.getElementById("nextButton").disabled = false;
					document.getElementById("nextButton").name = 'levelEnd';
					document.getElementById("nextButton").value = '../../pages/levelPage/levelPage.html';
				}else {
					setTimeout(function(){window.location.assign('../../pages/levelPage/levelPage.html');},1000);
				}
            } else {//quiz not completed, show feedback and 'next' button
				if (levelId==0  && gameDef(quizId).feedback!='no'){
					document.getElementById("feedback").innerHTML = '<div style="padding:5px;">'+feedback(gameDef(quizId).name, questionIx)+'</div>';
					document.getElementById("nextButton").disabled = false;
					document.getElementById("nextButton").name = 'next';
				}else {
					setTimeout(function(){displayQuestion();},1000);
				}
            }
            //set ready for next Item
            secondTry = true;
			localStorage.setItem('EUESPOTW_SecondTry',secondTry);
        } else {//wrong answer, add to counter, show feedback;
			if (secondTry!='true') {
				counter--;
				localStorage.setItem('EUESPOTW_Counter',counter);
				secondTry = true;
				localStorage.setItem('EUESPOTW_SecondTry',secondTry)
            }
        }
    }
	
	//mark correct answer
    function markCorrect(elem) {
        elem.style.backgroundColor = 'lime';
    }
	
	//mark wrong answer
    function markWrong(elem) {
        elem.style.backgroundColor = 'rosyBrown';
    }

	
	
//retrieve item set
function getItemSet(gix){	
	var out = new Array();
	var gameObj = gameDef(gix);
	if (gameObj.dataName == 'fullMatch'){	
		var setName = gameObj.questionBank;
		var outLength = itemDef(setName).length;
		for (var i=0;i<outLength;i++){
			out[i]=i+'|'+i;
		}
	}else {
		out = itemDef(gameObj.dataName);
	}
	return out;
}


//make HTML of question
function getQuestionHTML(gix,iix){
	var gameObj = gameDef(gix);
	var bankName = gameObj.questionBank;
	var itemType = gameObj.questionType;
	var itemValue = itemDef(bankName)[iix];
	if (itemType == 'picture'){
		out = '<img src="../../images-'+bankName+'/'+itemValue+'" />';
	}else if (itemType == 'textWithThumb'){
		if (itemDef('works').indexOf(iix+'a.jpg')<0){
			out = '<div style="width:200px;">Sample painting not available</div><h1>'+itemValue+'</h1>';
		}else {
			out = '<img src="../../images-works/'+iix+'a.jpg" width="200" /><h1>'+itemValue+'</h1>';
		}
	}else {
		out = '<h1>'+itemValue+'</h1>';
	}
	return out;
}


//make HTML of answer item
function getAnswerSetHTML(gix,items){
	var gameObj = gameDef(gix);
	var bankName = gameObj.answerBank;
	var itemType = gameObj.answerType;
	
	if (itemType == 'picture'){
		return pictureSetHTML(bankName,items);
	}else if (itemType == 'dates'){
		return datesSetHTML(bankName,items);
	}else if (itemType == 'textWithThumb'){
		return textWithThumbHTML(bankName,items);
	}else {
		return textSetHTML(bankName,items);
	}
}


//make HTML of answer item
function textSetHTML(bankName,items){
	var out='';
	for (i=0;i<items.length;i++){
		var itemValue = itemDef(bankName)[items[i][1]];
		var itemMark = items[i][0];
		out+= '<button name="'+itemMark+'">'+itemValue+'</button>';
	}
	return out;
}

//make HTML of picture answer item
function pictureSetHTML(bankName,items){
	var out='';
	for (i=0;i<items.length;i++){
		var itemValue = itemDef(bankName)[items[i][1]];
		var itemMark = items[i][0];
		out+= '<button name="'+itemMark+'"><img src="../../images-'+bankName+'/'+itemValue+'" /></button>';
	}
	return out;
}

//make HTML of picture answer item
function textWithThumbHTML(bankName,items){
	var out='';
	for (i=0;i<items.length;i++){
		var itemValue = itemDef(bankName)[items[i][1]];
		var itemMark = items[i][0];
		out+= '<button class="thumb" name="'+itemMark+'"><img src="../../images-'+bankName+'/thumb'+items[i][1]+'.jpg" /><p>'+itemValue+'</p></button>';
	}
	out+='<div style="clear:both;">&nbsp;</div>';
	return out;
}


//make dat set HTML
function datesSetHTML(bankName,items){
	var MAXWIDTH = 800; 
	var year= new Array(), zakres = new Array(), dateSpan = new Array(), mark = new Array();
	var axisPic = '../../images/lightgrey.png';
	var out='';
	var k=0;
	for (var i=0;i<items.length;i++){
		var itemValue = itemDef(bankName)[items[i][1]];
		zakres[i] = itemValue.split('-');
		year[k] = Number(zakres[i][0]);
		k++;
		year[k] = Number(zakres[i][1]);
		k++;
		dateSpan[i]=Number(zakres[i][1])-Number(zakres[i][0]);
		mark[i]=items[i][0];
	}
	var minYear = Math.min.apply(null,year);
	var maxYear = Math.max.apply(null,year);
	minYear = Math.floor(minYear/100)*100;
	maxYear = Math.ceil(maxYear/100)*100;
	var yearSpan = maxYear-minYear;
	var centuryCount = Math.floor(yearSpan/100);
	var scale = MAXWIDTH/yearSpan;
	out+='<div style="text-align:left;clear:both;">';
	out+='<div style="position:absolute;left:10">|'+minYear+'</div>';
	for (var i=1;i<centuryCount;i++){
		var century = minYear+(i*100);
		out+='<div style="position:absolute;left:'+(10+i*100*scale)+'px;">|'+century+'</div>';
	}
	out+='<div style="margin-left:'+(yearSpan*scale)+'px;">|'+maxYear+'</div>';
	out+='<div style="clear:both;"><img src="'+axisPic+'" width="'+yearSpan*scale+'" height="16" /></div>';
	for (var i=0;i<zakres.length;i++){
		out+='<div style="margin-left:'+Math.floor((zakres[i][0]-minYear)*scale)+'px; background-color:orange;width:'+Math.floor(dateSpan[i]*scale)+'px;text-align:center;color:black;"><button name="'+mark[i]+'">'+zakres[i][0]+'-'+zakres[i][1]+'</button></div>';
	}
	out+='</div>';
	return out;
}



//make HTML of answer item
function getAnswerHTML(gix,iix,key){
	var gameObj = gameDef(gix);
	var bankName = gameObj.answerBank;
	var itemType = gameObj.answerType;
	var itemValue = itemDef(bankName)[iix];
	if (itemType == 'picture'){
		out = '<img src="../../images-'+bankName+'/'+itemValue+'" />';
	}else if (itemType == 'dates'){
		out = datesHTML(itemValue);
	}else {
		out = itemValue;
	}
	return out;
}











initPage();


function initPage(){
    displayPage();
}

    function buttonHandler(eventInfo) {
        eventInfo.preventDefault();
        var button = eventInfo.currentTarget;
        window.location.assign(button.value);
    }

    function displayPage() {
        var records = getRecords();
        var gameNames = gameDef('listNames');
        var msgStr = '';
        msgStr = '<table cellpadding=0 cellspacing=0 border=0>';
		msgStr += '<tr><td></td><td style="text-align:right;"><strong>Best score</strong></td></tr>';
        for (var i = 0; i < gameNames.length; i++) {
			recordSplit = records[i].split('|');
            msgStr += '<tr>';
			msgStr += '<td>' + gameNames[i] + '</td>';
			msgStr += '<td style="text-align:right;"><strong>' + recordSplit[0] + ' </strong></td>';
			//msgStr += '<td style="text-align:right;">(' + recordSplit[1] + ' )</td>';
			msgStr += '</tr>';
        }
        msgStr += '</table>';
        document.getElementById("recordTable").innerHTML = toStaticHTML(msgStr);
    }

    function getRecords() {
        //Retrieve reults from local storage
        var gameNames = gameDef('listNames');
		var output = new Array;
        for (var i = 0; i < gameNames.length; i++) {
			var storValue = localStorage.getItem('EUESPOTW_Record'+i);
            if (storValue==null) {
                output[i] = '0|0';
            }
            else {
                output[i] = storValue;
            }
        }
        return output;
    }






$("button").click(buttonHandler);
initPage();


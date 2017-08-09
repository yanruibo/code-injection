



	var n_jugadors=3;

	function NumeroJugadors(a){
		n_jugadors = a;
		var camps_amagar=65;
		
		if(a==3){
			document.getElementById('boto_3').style.display='';
			document.getElementById('boto_4').style.display='none';
			//amagar columna del 4rt jugador
			for(var i=1;i<=camps_amagar;i++){
				 document.getElementById('amagar'+i).style.display='none';
			}
			for(i=1;i<=8;i++){
				document.getElementById('r'+i+'_tr').innerHTML = '9';
			}			
		}else if(a==4){
			document.getElementById('boto_3').style.display='none';
			document.getElementById('boto_4').style.display='';	
			//mostrar columna del 4rt jugador
			for(var i=1;i<=camps_amagar;i++){
				 document.getElementById('amagar'+i).style.display='';
			}
			for(i=1;i<=8;i++){
				document.getElementById('r'+i+'_tr').innerHTML = '8';
			}	
		}else{
			alert("Incorrect number of players");
		}
	}

	function MostrarDiv(a){
		try{
			document.getElementById('div_inici').style.display='none';
			for(var i=1;i<=9;i++){
				document.getElementById('div_ronda'+i).style.display='none';
			}
			document.getElementById('div_final').style.display='none';								
	
			document.getElementById('div_'+a).style.display='';
		}catch(err){ alert(err.message); }
	}
	
	function TotalRonda(r){
		try{
			for(var i =1;i<=4;i++){
				document.getElementById('i'+r+'_'+i+'_total').value=parseInt(document.getElementById('i'+r+'_'+i+'_goods').value)+parseInt(document.getElementById('i'+r+'_'+i+'_island').value)+parseInt(document.getElementById('i'+r+'_'+i+'_matepay').value)+parseInt(document.getElementById('i'+r+'_'+i+'_mate').value)+parseInt(document.getElementById('i'+r+'_'+i+'_boy').value);
			}
		}catch(err){ alert(err.message); }
	}	
	
	function TotalPartida(){
		try{
			var a1 = 0;
			var a2=0;
			var a3=0;
			var a4=0;
			for(var i =1;i<=9;i++){
				a1 += parseInt(document.getElementById('i'+i+'_1_total').value);
				a2 += parseInt(document.getElementById('i'+i+'_2_total').value);
				a3 += parseInt(document.getElementById('i'+i+'_3_total').value);
				a4 += parseInt(document.getElementById('i'+i+'_4_total').value);
			}
			document.getElementById('punts_totals_1').innerHTML = a1;
			document.getElementById('punts_totals_2').innerHTML = a2;
			document.getElementById('punts_totals_3').innerHTML = a3;
			document.getElementById('punts_totals_4').innerHTML = a4;
		 }catch(err){ alert(err.message);}
	}
	
	function NomJugador(j,a){
		try{
			for(var i=1;i<=9;i++){
				document.getElementById('i'+i+'_nom_jugador'+j).innerHTML = a;
			}
			document.getElementById('ifinal_nom_jugador'+j).innerHTML = a;
		}catch(err){ alert(err.message + i + j + a); }
	}
	
	function ResetPunts(){
		try{
			for(var i=1;i<=9;i++){
				for(var j=1;j<=4;j++){
					document.getElementById('i'+i+'_'+j+'_total').value=0;
					document.getElementById('i'+i+'_'+j+'_goods').value=0;
					document.getElementById('i'+i+'_'+j+'_island').value=0;
					document.getElementById('i'+i+'_'+j+'_matepay').value=0;
					document.getElementById('i'+i+'_'+j+'_mate').value=0;
					document.getElementById('i'+i+'_'+j+'_boy').value=0;
				}
			}
		}catch(err){ alert(err.message + i + j + a); }	
	
	}
	


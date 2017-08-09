












function populateDB(tx) {


  tx.executeSql('DROP TABLE IF EXISTS coeff;');
  tx.executeSql('DROP TABLE IF EXISTS correc_altitude;');
  tx.executeSql('DROP TABLE IF EXISTS zone_climatique;');
  tx.executeSql('DROP TABLE IF EXISTS departements;');
  tx.executeSql('DROP TABLE IF EXISTS type_logement;');
  tx.executeSql('DROP TABLE IF EXISTS date_construction;');
  tx.executeSql('DROP TABLE IF EXISTS altitude;');
  tx.executeSql('DROP TABLE IF EXISTS usages;');
  
  tx.executeSql("CREATE TABLE IF NOT EXISTS departements (num_departement, num_region, nom);");
  tx.executeSql("CREATE TABLE IF NOT EXISTS coeff (type, date, h1, h2, h3);");
  tx.executeSql("CREATE TABLE IF NOT EXISTS zone_climatique (dep, ref, zone);");
  tx.executeSql("CREATE TABLE IF NOT EXISTS type_logement (num_id, libelle);");
  tx.executeSql("CREATE TABLE IF NOT EXISTS date_construction (ordre, date);");
  tx.executeSql("CREATE TABLE IF NOT EXISTS altitude (altitude)");  
  tx.executeSql("CREATE TABLE IF NOT EXISTS correc_altitude (ref, corr_0, corr_200, corr_400, corr_500, corr_600, corr_700, corr_800, corr_900, corr_1000, corr_1100, corr_1200, corr_1300, corr_1400, corr_1500, corr_1600, corr_1700, corr_1800, corr_1900, corr_2000);");
  tx.executeSql("CREATE TABLE IF NOT EXISTS usages (usage)");


  tx.executeSql("INSERT INTO correc_altitude VALUES (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-2, -2, -2, -2, -3, -3, -4, -4, -5, -5, -6, -6, -7, -7, -8, -8, -9, -9, -10, -10);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-4, -4, -4, -6, -6, -6, -7, -7, -8, -8, -9, -9, -10, -10, -11, -44, -12, -12, -13, -13);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-5, -5, -5, -6, -7, -7, -8, -8, -9, -9, -10, -10, -11, -11, -12, -12, -13, -13, -14, -14);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-6, -6, -6, -7, -8, -9, -10, -11, -12, -13, -14, -14, -14, -14, -14, -14, -14, -14, -14, -14);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-7, -7, -7, -8, -9, -10, -11, -12, -13, -14, -15, -15, -15, -15, -15, -15, -15, -15, -15, -15);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-8, -8, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24, -25);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-9, -9, -9, -10, -11, -11, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-10, -10, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24, -25, -26, -27);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-12, -12, -12, -13, -14, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24, -24, -24, -24, -24, -24);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-13, -13, -15, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24, -24, -24, -24, -24, -24, -24, -24);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-14, -14, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24, -24, -24, -24, -24, -24, -24, -24, -24);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-15, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24, -24, -24, -24, -24, -24, -24, -24, -24, -24);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-16, -16, -17, -18, -19, -20, -21, -22, -23, -24, -24, -24, -24, -24, -24, -24, -24, -24, -24, -24);");
  tx.executeSql("INSERT INTO correc_altitude VALUES (-17, -17, -18, -19, -20, -21, -22, -23, -24, -24, -24, -24, -24, -24, -24, -24, -24, -24, -24, -24);");

  tx.executeSql("INSERT INTO altitude VALUES (0);");
  tx.executeSql("INSERT INTO altitude VALUES (200);");
  tx.executeSql("INSERT INTO altitude VALUES (400);");
  tx.executeSql("INSERT INTO altitude VALUES (500);");
  tx.executeSql("INSERT INTO altitude VALUES (600);");
  tx.executeSql("INSERT INTO altitude VALUES (700);");
  tx.executeSql("INSERT INTO altitude VALUES (800);");
  tx.executeSql("INSERT INTO altitude VALUES (900);");
  tx.executeSql("INSERT INTO altitude VALUES (1000);");
  tx.executeSql("INSERT INTO altitude VALUES (1100);");
  tx.executeSql("INSERT INTO altitude VALUES (1200);");
  tx.executeSql("INSERT INTO altitude VALUES (1300);");
  tx.executeSql("INSERT INTO altitude VALUES (1400);");
  tx.executeSql("INSERT INTO altitude VALUES (1500);");
  tx.executeSql("INSERT INTO altitude VALUES (1600);");
  tx.executeSql("INSERT INTO altitude VALUES (1700);");
  tx.executeSql("INSERT INTO altitude VALUES (1800);");
  tx.executeSql("INSERT INTO altitude VALUES (1900);");
  tx.executeSql("INSERT INTO altitude VALUES (2000);");
  
  tx.executeSql("INSERT INTO date_construction VALUES (1, '< 1974');");
  tx.executeSql("INSERT INTO date_construction VALUES (2, '< 1982');");
  tx.executeSql("INSERT INTO date_construction VALUES (3, '> 1982');");
  tx.executeSql("INSERT INTO date_construction VALUES (4, '> 2000');");
  
  tx.executeSql("INSERT INTO type_logement VALUES (1, 'maison');");
  tx.executeSql("INSERT INTO type_logement VALUES (2, 'appartement');");
  
  tx.executeSql("INSERT INTO usages VALUES ('residentiel');");
  tx.executeSql("INSERT INTO usages VALUES ('tertiaire');");
  
  tx.executeSql("INSERT INTO coeff VALUES ('maison', '< 1974', 1.6, 1.6, 1.6);");
  tx.executeSql("INSERT INTO coeff VALUES ('maison', '< 1982', 1.2, 1.25, 1.35);");
  tx.executeSql("INSERT INTO coeff VALUES ('maison', '> 1982', 0.9, 0.95, 1);");
  tx.executeSql("INSERT INTO coeff VALUES ('maison', '> 2000', 0.8, 0.85, 0.9);");
  tx.executeSql("INSERT INTO coeff VALUES ('appartement', '< 1974', 1.2, 1.2, 1.2);");
  tx.executeSql("INSERT INTO coeff VALUES ('appartement', '< 1982', 0.9, 0.95, 0.8);");
  tx.executeSql("INSERT INTO coeff VALUES ('appartement', '> 1982', 0.7, 0.75, 0.8);");
  tx.executeSql("INSERT INTO coeff VALUES ('appartement', '> 2000', 0.6, 0.65, 0.7);");
  


  
  tx.executeSql("INSERT INTO zone_climatique VALUES ('01', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('02', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('03', -8, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('04', -8, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('05', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('06', -8, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('07', -6, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('08', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('09', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('10', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('11', -5, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('12', -8, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('13', -5, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('14', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('15', -8, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('16', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('17', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('18', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('19', -8, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('20', -2, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('21', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('22', -4, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('23', -8, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('24', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('25', -12, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('26', -6, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('27', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('28', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('29', -4, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('30', -5, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('31', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('32', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('33', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('34', -5, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('35', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('36', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('37', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('38', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('39', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('40', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('41', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('42', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('43', -8, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('44', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('45', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('46', -6, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('47', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('48', -8, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('49', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('50', -4, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('51', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('52', -12, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('53', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('54', -15, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('55', -12, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('56', -4, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('57', -15, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('58', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('59', -9, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('60', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('61', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('62', -9, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('63', -8, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('64', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('65', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('66', -5, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('67', -15, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('68', -15, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('69', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('70', -12, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('71', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('72', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('73', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('74', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('75', -5, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('76', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('77', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('78', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('79', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('80', -9, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('81', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('82', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('83', -5, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('84', -6, 'H3');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('85', -5, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('86', -7, 'H2');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('87', -8, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('88', -15, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('89', -10, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('90', -15, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('91', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('92', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('93', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('94', -7, 'H1');");
  tx.executeSql("INSERT INTO zone_climatique VALUES ('95', -7, 'H1');");

  tx.executeSql("INSERT INTO departements VALUES ('01', '22', 'Ain');");
  tx.executeSql("INSERT INTO departements VALUES ('02', '20', 'Aisne');");
  tx.executeSql("INSERT INTO departements VALUES ('03', '3', 'Allier');");
  tx.executeSql("INSERT INTO departements VALUES ('04', '18', 'Alpes de haute provence');");
  tx.executeSql("INSERT INTO departements VALUES ('05', '18', 'Hautes alpes');");
  tx.executeSql("INSERT INTO departements VALUES ('06', '18', 'Alpes maritimes');");
  tx.executeSql("INSERT INTO departements VALUES ('07', '22', 'Ardèche');");
  tx.executeSql("INSERT INTO departements VALUES ('08', '8', 'Ardennes');");
  tx.executeSql("INSERT INTO departements VALUES ('09', '16', 'Ariège');");
  tx.executeSql("INSERT INTO departements VALUES ('10', '8', 'Aube');");
  tx.executeSql("INSERT INTO departements VALUES ('11', '13', 'Aude');");
  tx.executeSql("INSERT INTO departements VALUES ('12', '16', 'Aveyron');");
  tx.executeSql("INSERT INTO departements VALUES ('13', '18', 'Bouches du rhône');");
  tx.executeSql("INSERT INTO departements VALUES ('14', '4', 'Calvados');");
  tx.executeSql("INSERT INTO departements VALUES ('15', '3', 'Cantal');");
  tx.executeSql("INSERT INTO departements VALUES ('16', '21', 'Charente');");
  tx.executeSql("INSERT INTO departements VALUES ('17', '21', 'Charente maritime');");
  tx.executeSql("INSERT INTO departements VALUES ('18', '7', 'Cher');");
  tx.executeSql("INSERT INTO departements VALUES ('19', '14', 'Corrèze');");
  tx.executeSql("INSERT INTO departements VALUES ('21', '5', 'Côte d&#39;or');");
  tx.executeSql("INSERT INTO departements VALUES ('22', '6', 'Côtes d&#39;Armor');");
  tx.executeSql("INSERT INTO departements VALUES ('23', '14', 'Creuse');");
  tx.executeSql("INSERT INTO departements VALUES ('24', '2', 'Dordogne');");
  tx.executeSql("INSERT INTO departements VALUES ('25', '10', 'Doubs');");
  tx.executeSql("INSERT INTO departements VALUES ('26', '22', 'Drôme');");
  tx.executeSql("INSERT INTO departements VALUES ('27', '11', 'Eure');");
  tx.executeSql("INSERT INTO departements VALUES ('28', '7', 'Eure et Loir');");
  tx.executeSql("INSERT INTO departements VALUES ('29', '6', 'Finistère');");
  tx.executeSql("INSERT INTO departements VALUES ('30', '13', 'Gard');");
  tx.executeSql("INSERT INTO departements VALUES ('31', '16', 'Haute garonne');");
  tx.executeSql("INSERT INTO departements VALUES ('32', '16', 'Gers');");
  tx.executeSql("INSERT INTO departements VALUES ('33', '2', 'Gironde');");
  tx.executeSql("INSERT INTO departements VALUES ('34', '13', 'Hérault');");
  tx.executeSql("INSERT INTO departements VALUES ('35', '6', 'Ile et Vilaine');");
  tx.executeSql("INSERT INTO departements VALUES ('36', '7', 'Indre');");
  tx.executeSql("INSERT INTO departements VALUES ('37', '7', 'Indre et Loire');");
  tx.executeSql("INSERT INTO departements VALUES ('38', '22', 'Isère');");
  tx.executeSql("INSERT INTO departements VALUES ('39', '10', 'Jura');");
  tx.executeSql("INSERT INTO departements VALUES ('40', '2', 'Landes');");
  tx.executeSql("INSERT INTO departements VALUES ('41', '7', 'Loir et Cher');");
  tx.executeSql("INSERT INTO departements VALUES ('42', '22', 'Loire');");
  tx.executeSql("INSERT INTO departements VALUES ('43', '3', 'Haute loire');");
  tx.executeSql("INSERT INTO departements VALUES ('44', '19', 'Loire Atlantique');");
  tx.executeSql("INSERT INTO departements VALUES ('45', '7', 'Loiret');");
  tx.executeSql("INSERT INTO departements VALUES ('46', '16', 'Lot');");
  tx.executeSql("INSERT INTO departements VALUES ('47', '2', 'Lot et Garonne');");
  tx.executeSql("INSERT INTO departements VALUES ('48', '13', 'Lozère');");
  tx.executeSql("INSERT INTO departements VALUES ('49', '19', 'Maine et Loire');");
  tx.executeSql("INSERT INTO departements VALUES ('50', '4', 'Manche');");
  tx.executeSql("INSERT INTO departements VALUES ('51', '8', 'Marne');");
  tx.executeSql("INSERT INTO departements VALUES ('52', '8', 'Haute Marne');");
  tx.executeSql("INSERT INTO departements VALUES ('53', '19', 'Mayenne');");
  tx.executeSql("INSERT INTO departements VALUES ('54', '15', 'Meurthe et Moselle');");
  tx.executeSql("INSERT INTO departements VALUES ('55', '15', 'Meuse');");
  tx.executeSql("INSERT INTO departements VALUES ('56', '6', 'Morbihan');");
  tx.executeSql("INSERT INTO departements VALUES ('57', '15', 'Moselle');");
  tx.executeSql("INSERT INTO departements VALUES ('58', '5', 'Nièvre');");
  tx.executeSql("INSERT INTO departements VALUES ('59', '17', 'Nord');");
  tx.executeSql("INSERT INTO departements VALUES ('60', '20', 'Oise');");
  tx.executeSql("INSERT INTO departements VALUES ('61', '4', 'Orne');");
  tx.executeSql("INSERT INTO departements VALUES ('62', '17', 'Pas de Calais');");
  tx.executeSql("INSERT INTO departements VALUES ('63', '3', 'Puy de Dôme');");
  tx.executeSql("INSERT INTO departements VALUES ('64', '2', 'Pyrénées Atlantiques');");
  tx.executeSql("INSERT INTO departements VALUES ('65', '16', 'Hautes Pyrénées');");
  tx.executeSql("INSERT INTO departements VALUES ('66', '13', 'Pyrénées Orientales');");
  tx.executeSql("INSERT INTO departements VALUES ('67', '1', 'Bas Rhin');");
  tx.executeSql("INSERT INTO departements VALUES ('68', '1', 'Haut Rhin');");
  tx.executeSql("INSERT INTO departements VALUES ('69', '22', 'Rhône');");
  tx.executeSql("INSERT INTO departements VALUES ('70', '10', 'Haute Saône');");
  tx.executeSql("INSERT INTO departements VALUES ('71', '5', 'Saône et Loire');");
  tx.executeSql("INSERT INTO departements VALUES ('72', '19', 'Sarthe');");
  tx.executeSql("INSERT INTO departements VALUES ('73', '22', 'Savoie');");
  tx.executeSql("INSERT INTO departements VALUES ('74', '22', 'Haute Savoie');");
  tx.executeSql("INSERT INTO departements VALUES ('75', '12', 'Paris');");
  tx.executeSql("INSERT INTO departements VALUES ('76', '11', 'Seine Maritime');");
  tx.executeSql("INSERT INTO departements VALUES ('77', '12', 'Seine et Marne');");
  tx.executeSql("INSERT INTO departements VALUES ('78', '12', 'Yvelines');");
  tx.executeSql("INSERT INTO departements VALUES ('79', '21', 'Deux Sèvres');");
  tx.executeSql("INSERT INTO departements VALUES ('80', '20', 'Somme');");
  tx.executeSql("INSERT INTO departements VALUES ('81', '16', 'Tarn');");
  tx.executeSql("INSERT INTO departements VALUES ('82', '16', 'Tarn et Garonne');");
  tx.executeSql("INSERT INTO departements VALUES ('83', '18', 'Var');");
  tx.executeSql("INSERT INTO departements VALUES ('84', '18', 'Vaucluse');");
  tx.executeSql("INSERT INTO departements VALUES ('85', '19', 'Vendée');");
  tx.executeSql("INSERT INTO departements VALUES ('86', '21', 'Vienne');");
  tx.executeSql("INSERT INTO departements VALUES ('87', '14', 'Haute Vienne');");
  tx.executeSql("INSERT INTO departements VALUES ('88', '15', 'Vosge');");
  tx.executeSql("INSERT INTO departements VALUES ('89', '5', 'Yonne');");
  tx.executeSql("INSERT INTO departements VALUES ('90', '10', 'Territoire de Belfort');");
  tx.executeSql("INSERT INTO departements VALUES ('91', '12', 'Essonne');");
  tx.executeSql("INSERT INTO departements VALUES ('92', '12', 'Haut de seine');");
  tx.executeSql("INSERT INTO departements VALUES ('93', '12', 'Seine Saint Denis');");
  tx.executeSql("INSERT INTO departements VALUES ('94', '12', 'Val de Marne');");
  tx.executeSql("INSERT INTO departements VALUES ('95', '12', 'Val d&#39;Oise');");
  tx.executeSql("INSERT INTO departements VALUES ('2a', '9', 'Corse du Sud');");
  tx.executeSql("INSERT INTO departements VALUES ('2b', '9', 'Haute Corse');");

}





function thr_initDB(){
    db = window.openDatabase("Database", "1.0", DB_NAME, 90000);
    db.transaction(populateDB, errorCB, successCB);
}
function errorCB(tx, err) {
    alert("Error processing SQL: "+err.code+":"+err.message);
}
function successCB() {
    thr_initApp();
}



function fill_s1(){

    //if(step4_ok) clearData();

    $('#c_rech_step1').html('');

    if($tableResultVal['hauteur']>0 && $tableResultVal['surface']>0){
      $tableResultVal['volume']=$tableResultVal['hauteur'] * $tableResultVal['surface'];
      $tableResult['volume']=$tableResultVal['volume'];
    }


    if($tableResult["zone"]!='' && $tableResultVal['logement']!='' && $tableResultVal['construction']!=''){
      getCoeffG();
    }

    $content='';
    $content+='<div id="bts_haut">';

    $content+='<img id="cale_titre" src="interface/cale_titre.png" alt="" />';

    if($tableResultVal["departement"]!='' && $tableResultVal["zone"]!='' && $tableResultVal["logement"]!='' && $tableResultVal["construction"]!='' && $tableResultVal["altitude"]!='' && $tableResultVal["surface"]!='' && $tableResultVal["hauteur"]!='' && $tableResultVal["volume"]!='' && $tableResultVal["temp_souhait"]!='' && $tableCalcul["temp_ref"]!='' && $tableCalcul["temp_corrige"]!=''){
        $content+='<a id="bt_liste" class="btn_result_s13" href=""> <img src="interface/bt_liste.png" alt="Liste"> </a>';
    }else{
        $content+='<div id="bt_liste" ></div>';
    }
    $content+='</div>';
    $content+='<div id="menu_choix">';


    for($key in $tableChoix){

        $elem = $tableChoix[$key];

        if( !$tableDisabled[$key] ){
          if( $tableChoixGriser[$key] ){

              $content+='<div class="choix_ligne">';
              $content+='<img src="interface/fond_choix_off.png" alt="" />';
              $content+='<div class="choix_lib"><table><tr><td>' + $elem;
              if($tableUnite[$key]!='') $content+=' ('+$tableUnite[$key] +')';
              $content+='</td></tr></table></div>';
              $content+='<div class="choix_val"><table><tr><td>' + ($tableResult[$key]=="0" ? "" : $tableResult[$key])  + '</td></tr></table></div>';
              $content+='</div>';

          }else{

              $content+='<a href="" choice_key="'+$key+'" choice_value="'+$elem+'"  class="choix_ligne">';

              $content+='<img src="interface/fond_choix.png" alt="" />';
              $content+='<div class="choix_lib"><table><tr><td>' + $elem;
              if($tableUnite[$key]!='') $content+=' ('+$tableUnite[$key] +')';
              $content+='</td></tr></table></div>';
              var $resultCourt=$tableResult[$key].toString();
              $content+='<div class="choix_val"><table><tr><td>'+$resultCourt.substr(0,14)+ '</td></tr></table></div>';
              $content+='</a>';
          }
      }
    }

    $('#c_rech_step1').html($content+'</div>');
    $("a.choix_ligne").click(function(e){
      step2_key = $(this).attr("choice_key");
      openPage(101);
    });

    $("a.btn_result_s13").click(function(e){
      openPage(103);
    });
}






function fill_s2(){

  $('#c_rech_step2').html('');



  if(step2_key=="departement" || step2_key=="logement" || step2_key=="construction" || step2_key=="altitude" || step2_key=="usage"){
    listeParamSelected();
  }else if(step2_key=="surface" || step2_key=="hauteur" || step2_key=="temp_souhait"){
    freeParamSelected();
  }

}

function freeParamSelected(){

    var defaut_text="Entrez la "+$tableChoix[step2_key];


    $content='';

    $content+='<div id="bts_haut">';
    $content+='<img src="interface/cale_titre.png" alt="" />';
    $content+='<div id="haut_titre">'+$tableChoix[step2_key]+'</div>';
    $content+='</div>';

    $content+='<div id="menu_param">';

    $content+='<p><br /><br /><br /><br />';
    $content+=defaut_text;
    if($tableUnite[step2_key]!='') $content+=' ('+$tableUnite[step2_key] +')';
    $content+='</p>';

    $content+='<div id="fond_reference">';
    $content+='<input type="text" name="saisie_txt" id="saisie_txt" value="'+$tableResultVal[step2_key]+'" onfocus="" />';
    $content+='</div>';

    $content+='</div>';

    $content+='<div id="detail_boutons_bas">';
    $content+='<a class="valide_s2" href="" ><img src="interface/bt_valider.png" alt=""></a>';
    $content+='<a class="bt_retour_21" href="" ><img src="interface/bt_annuler.png" alt=""></a>';
    $content+='</div>';


    $('#c_rech_step2').html($content);

    //$("#haut_titre").html($tableTitre[step2_key]);

    $("a.valide_s2").click(function(e){

        var writed_text= $('#saisie_txt').val();
        writed_text=writed_text.replace(",",".");

        if(writed_text=='') {back_to_s1(); return;}

        $tableResult[step2_key]=writed_text;
        $tableResultVal[step2_key]=writed_text;

        openPage(102);
     });

     $("a.bt_retour_21").click(function(e){
            back_to_s1();
     });

}



function listeParamSelected(){

    if(step2_key=="departement"){
      req_step2 = "SELECT nom, num_departement FROM departements order by num_departement asc";
    }else if(step2_key=="logement"){
      req_step2 = "SELECT libelle FROM type_logement order by libelle desc";
    }else if(step2_key=="construction"){
      req_step2 = "SELECT date FROM date_construction order by ordre asc";
    }else if(step2_key=="altitude"){
      req_step2 = "SELECT altitude FROM altitude order by altitude asc";
    }else if(step2_key=="usage"){
      req_step2 = "SELECT usage FROM usages order by usage asc";
    }

    last_step3_key=step2_key;
    db.transaction(queryStep2, errorCB);
}

function queryStep2(tx){
    tx.executeSql(req_step2, [], success_s2, errorCB);
}


function success_s2(tx, results){

    if (!results.rowsAffected) {
        alert('No rows affected!');
        return false;
    }

    $content='';
    $content+='<div id="bts_haut">';
    $content+='<img src="interface/cale_titre.png" alt="" />';
    $content+='<div id="haut_titre"></div>';
    $content+='</div>';

    $content+='<div id="menu_param">';

    $_value='';

    for(var i=0; i < results.rows.length; i++)  {


      if(step2_key == "departement") {
        $_value_texte = results.rows.item(i).num_departement+" "+results.rows.item(i).nom;
        $_value = results.rows.item(i).num_departement;
      }else if(step2_key == "logement") {
        $_value_texte = results.rows.item(i).libelle;
        $_value = $_value_texte;
      }else if(step2_key == "construction") {
        $_value_texte = results.rows.item(i).date;
        $_value = $_value_texte;
      }else if(step2_key == "altitude") {
        $_value_texte = results.rows.item(i).altitude;
        $_value = $_value_texte;
      }else if(step2_key == "usage") {
        $_value_texte = results.rows.item(i).usage;
        $_value = $_value_texte;
      }



      $content += '<div param="'+$_value_texte+'" paramval="'+$_value+'" ';
      if($tableResultVal[step2_key] == ''+$_value){
        $content+=' class="param_ligne_on"';
      }else{
        $content+=' class="param_ligne" ';
      }
      $content+='>';
      $content+='<img id="' + step2_key + '" alt=""';

      if($tableResultVal[step2_key] == ''+$_value){
        $content+=' src="interface/param_on.png" ';
      }else{
        $content+=' src="interface/param.png" ';
      }

      $content+='/>';
      $content+='<div class="param_val"><table><tr><td>'+$_value_texte+' '+$tableUnite[step2_key] +'</td></tr></table></div>';

      $content+='</div>';

    }

    $content+='</div>';

    $content+='<div id="detail_boutons_bas">';
    $content+='<a class="bt_retour_21" href="" ><img src="interface/bt_annuler.png" alt="" /></a>';
    $content+='</div>';

    $('#c_rech_step2').html($content);

    $("#haut_titre").html($tableTitre[step2_key]);

    $(".param_ligne").click(function(e){

       step3_key = $(this).attr("paramval");
       step3_key_texte = $(this).attr("param");

       //alert(step3_key+' - '+step3_key_texte);

       $tableResult[step2_key] = step3_key_texte;
       $tableResultVal[step2_key] = step3_key;

     if(step2_key=="departement"){
        getZoneClimatique(step3_key);
      } else if(step2_key=='altitude' && $tableCalcul["pair_temp"]!=''){
        getTempCorrec($tableResultVal["altitude"], $tableCalcul["pair_temp"]);
      }else{
        openPage(102);
      }
    });

    $("a.param_ligne_on").click(function(e){
        openPage(102);
    });

    $("a.bt_retour_21").click(function(e){
        back_to_s1();
    });

}







function fill_s3(){


    $('#p_rech_step3').html('');



    //if($tableResultVal["usage"]=='residentiel'){



    deperditions=$tableCalcul["coeff_g"]*$tableResultVal["volume"]*($tableResultVal["temp_souhait"]-$tableCalcul["temp_corrige"]);
    deperditions=Math.round(deperditions);

    if($tableResultVal["logement"]=='maison'){
      residentiel=deperditions+(10*$tableResultVal["volume"]);
    }else if($tableResultVal["logement"]=='appartement'){
      residentiel=deperditions+(15*$tableResultVal["volume"]);
    }

    tertiaire=deperditions*1.2;

    residentiel=Math.round(residentiel);
    tertiaire=Math.round(tertiaire);

    $content='';
    $content+='<div id="detail_contenu" style="font-size:1.1em;">';

    $content+='<div id="detail_contenu_titre">PUISSANCE<br /><b>A INSTALLER</b></div>';




    $content+='Département : <span>'+$tableResult["departement"]+'</span><br />';
    $content+='Type de logement : <span>'+$tableResult["logement"]+'</span><br />';
    $content+='Date de construction : <span>'+$tableResult["construction"]+'</span><br />';
    $content+='Altitude : <span>'+$tableResult["altitude"]+' m</span><br />';
    //$content+='Usage du logement : <span>'+$tableResult["usage"]+'</span><br />';
    $content+='Surface du logement : <span>'+$tableResult["surface"]+' m<sup>2</sup></span><br />';
    $content+='Hauteur sous plafond : <span>'+$tableResult["hauteur"]+' m</span><br />';
    $content+='Volume : <span>'+$tableResult["volume"]+'</span> m<sup>3</sup><br />';
    $content+='T° intérieure demandée : <span>'+$tableResult["temp_souhait"]+' °C</span>';

    $content+='</div>';


    $content+='<div id="detail_contenu_large">';
    $content+='<div id="detail_contenu_sstitre"><b>Puissance à installer : </b></div>';


    if($tableResultVal["usage"]=="residentiel" || $tableResultVal["usage"]==""){
      $content+='<div class="detail_ligne">';
      $content+='<img src="interface/fond_info.png" alt="" />';
      $content+='<div class="info_lib"><table><tr><td>En résidentiel</td></tr></table></div>';
      $content+='<div class="info_val"><table><tr><td>'+residentiel+' W</td></tr></table></div>';
      $content+='</div>';
    }

    if($tableResultVal["usage"]=="tertiaire"){
      $content+='<div class="detail_ligne">';
      $content+='<img src="interface/fond_info.png" alt="" />';
      $content+='<div class="info_lib"><table><tr><td>En tertiaire</td></tr></table></div>';
      $content+='<div class="info_val"><table><tr><td>'+tertiaire+' W</td></tr></table></div>';
      $content+='</div>';
    }

    $content+='<div id="detail_contenu_sstitre"><small>';
    $content+='<b>Puissance minimale requise : '+deperditions+' W</b>';
    $content+='<br /><small><small>(La puissance est à répartir par pièce dans le cas ou vous l\'avez calculée pour un logement complet)</small></small>';
    $content+='</small></div>';

    $content+='</div>';


    $content+='<div id="detail_boutons_bas">';
    $content+='<center>Envoyer cette page : <img src="interface/bt_email.png" align="absmiddle" id="btemail"  alt="" /></center>';
    $content+='<a class="bt_retour_detail" href="" ><img src="interface/bt_retour.png" alt=""></a>';
    $content+='</div>';


    $content+='<div id="detail_message_bas">';
    $content+='Logiciel simplifié de calcul de puissance des appareils de chauffage électrique.<br />Cet outil ne remplace pas une étude thermique réalisée par un professionnel.';
    $content+='</div>';

    $('#p_rech_step3').html($content);

    $("a.bt_retour_detail").click(function(e){
      back_to_s1();
    });
    $("#btemail").click(function(e){
      sendEmail();
    });

    step4_ok=true;


}

/*
function fill_s4(){

    $('#p_rech_step4').html('');


    $content='';

    $content+='<div id="bts_haut">';
    $content+='<img src="interface/cale_titre.png" alt="" />';
    $content+='</div>';

    $content+='<div id="menu_param">';
    $content+='<p><br /><br /><br />Saisir votre adresse e-mail : </p>';
    $content+='<div id="fond_reference">';
    $content+='<input type="email" name="email_txt" id="email_txt" value="" onfocus="" />';
    $content+='</div>';
    $content+='</div>';

    $content+='<div id="detail_boutons_bas">';
    $content+='<a class="valider_s4" href=""><img src="interface/bt_envoyer.png" alt="Valider"></a>';
    $content+='<a class="bt_retour_43" href="" ><img src="interface/bt_annuler.png" alt="Annuler"></a>';
    $content+='</div>';

    $('#p_rech_step4').html($content);

    $("a.bt_retour_43").click(function(e){
      back_to_s3();
    });
    $("a.valider_s4").click(function(e){
      sendEmail();
    });

}
*/

function sendEmail(){


    var $contentEmail="";

    $contentEmail+='Département : '+$tableResult["departement"]+'\n';
    $contentEmail+='Type de logement : '+$tableResult["logement"]+'\n';
    $contentEmail+='Date de construction : '+$tableResult["construction"]+'\n';
    $contentEmail+='Altitude : '+$tableResult["altitude"]+' m\n';
    $contentEmail+='Surface du logement : '+$tableResult["surface"]+' m²\n';
    $contentEmail+='Hauteur sous plafond : '+$tableResult["hauteur"]+' m\n';
    $contentEmail+='Volume : '+$tableResult["volume"]+' m3\n';
    $contentEmail+='T° intérieure demandée : '+$tableResult["temp_souhait"]+' °C\n';


    if($tableResultVal["usage"]=="residentiel" || $tableResultVal["usage"]==""){
      $contentEmail+='\nPuissance à installer en usage résidentiel : '+residentiel+' W\n\n';
    }

    if($tableResultVal["usage"]=="tertiaire"){
      $contentEmail+='\nPuissance à installer en usage tertiaire : '+tertiaire+' W\n\n';
    }

  $contentEmail+='L\'équipe Thermor';

  $contentEmail+='\n\n\nLogiciel simplifié de calcul de puissance des appareils de chauffage électrique. Cet outil ne remplace pas une étude thermique réalisée par un professionnel.';

  var extras = {};
  extras[WebIntent.EXTRA_SUBJECT] = "Votre calcul de puissance pour radiateur électriques";
  extras[WebIntent.EXTRA_TEXT] = $contentEmail;
  window.plugins.webintent.startActivity({
      url: "",
      action: WebIntent.ACTION_SEND,
      type: 'text/plain',
      extras: extras
    },
    function() {
    },
    function() {
      alert("Echec lors de l'envoi de l'email");
    }
  );

}

$(function(){ 
  document.addEventListener("deviceready", onDeviceReady, false);
});
function onDeviceReady() {


    document.addEventListener("backbutton", function(e){

        if($.mobile.activePage.is('#p_acceuil')){
            e.preventDefault();
            navigator.app.exitApp();
        }else if($.mobile.activePage.is('#p_rech_step1') || $.mobile.activePage.is('#p_aide') || $.mobile.activePage.is('#p_services')){
          openPage(0);
        }else if($.mobile.activePage.is('#p_rech_step2') || $.mobile.activePage.is('#p_rech_step3') || $.mobile.activePage.is('#p_rech_step4') ){
          openPage(100);
        }

    }, false);


    thr_initDB();
}
function thr_initApp(){
    bind_all(); 
}



function bind_all(){
 
  $(".btn_lien_acc").click(function(e){openPage(0);});	    
  $("#bt_recherche").click(function(e){openPage(100);});
  $("#bt_service").click(function(e){openPage(2);});	
  $("#bt_aide").click(function(e){openPage(3);});	   
  
}	
function openPage(id){
  switch (id){
    
    case 0:    
    
    
    clearData();
    
    $.mobile.changePage("#p_acceuil", {
      transition: "slide",
      reverse: true,
      changeHash: false
    });
    break;
    
    case 2: 
      $.mobile.changePage("#p_services", {
      transition: "slide",
      reverse: false,
      changeHash: false
      });
    break; 			
    
    case 3: 
    $.mobile.changePage("#p_aide", {
      transition: "slide",
      reverse: false,
      changeHash: false
    });
    break;
    
    case 100:
      fill_s1();
      $.mobile.changePage("#p_rech_step1", {
      transition: "slide",
      reverse: false,
      changeHash: false
    });
    break;
    
    case 101: 
    fill_s2();
    $.mobile.changePage("#p_rech_step2", {
      transition: "slide",
      reverse: false,
      changeHash: false
    });
    break;
    
    case 102:
    fill_s1();
    $.mobile.changePage("#p_rech_step1", {
      transition: "slide",
      reverse: true,
      changeHash: false
    });
    break;
    
    case 103:
      fill_s3();
      $.mobile.changePage("#p_rech_step3", {
        transition: "slide",
        reverse: false,
        changeHash: false
    });
    break;


    case 104:
      fill_s4();
      $.mobile.changePage("#p_rech_step4", {
        transition: "slide",
        reverse: false,
        changeHash: false
    });
    break;
     	
    default:
    break; 
  }

}


function back_to_s1(){
  $.mobile.changePage("#p_rech_step1", { transition: "slide",reverse: true,changeHash: false, showLoadMsg:true});
}

function back_to_s2(){
    $.mobile.changePage("#p_rech_step2", { transition: "slide",reverse: true,changeHash: false, showLoadMsg:true});
}

function back_to_s3(){
    $.mobile.changePage("#p_rech_step3", { transition: "slide",reverse: true,changeHash: false, showLoadMsg:true});
}

function back_to_s4(){
    $.mobile.changePage("#p_rech_step4", { transition: "slide",reverse: true,changeHash: false, showLoadMsg:true});
}


/**
 * cordova Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

WebIntent.prototype.startActivity = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getUri = function(success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};


WebIntent.prototype.onNewIntent = function(callback) {
	return cordova.exec(function(args) {
		callback(args);
    }, function(args) {
    }, 'WebIntent', 'onNewIntent', []);
};

WebIntent.prototype.sendBroadcast = function(params, success, fail) {
    return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};

cordova.addConstructor(function() {
	window.webintent = new WebIntent();
	
	// backwards compatibility	
	window.plugins = window.plugins || {};
	window.plugins.webintent = window.webintent;
});


function getZoneClimatique(dep){

  req_zoneclim = "SELECT zone, ref FROM zone_climatique where dep='"+dep+"';";
  db.transaction(queryzoneClim, errorCB);
}

function queryzoneClim(tx){
    tx.executeSql(req_zoneclim, [], success_zoneclim, errorCB);
}


function success_zoneclim(tx, results){

    if (!results.rowsAffected) {
        alert('Zone Climatique non trouvée !');
        return false;
    }

    $tableResult["zone"]=results.rows.item(0).zone;
    $tableResultVal["zone"]=results.rows.item(0).zone;

    $tableCalcul["temp_ref"]=results.rows.item(0).ref;



    var debugVal=0;
    if(debugVal==1){
        $tableResultVal["logement"]="maison";
        $tableResultVal["construction"]="< 1982";
        $tableResultVal["altitude"]=700;
        $tableResultVal["usage"]="residentiel";
        $tableResultVal["surface"]=80;
        $tableResultVal["hauteur"]=2.5;
        $tableResultVal["volume"]=$tableResultVal["surface"]*$tableResultVal["hauteur"];
        $tableResultVal["temp_souhait"]=19;

        $tableResult["logement"]=$tableResultVal["logement"];
        $tableResult["construction"]=$tableResultVal["construction"];
        $tableResult["altitude"]=$tableResultVal["altitude"];
        $tableResult["usage"]=$tableResultVal["usage"];
        $tableResult["surface"]=$tableResultVal["surface"];
        $tableResult["hauteur"]=$tableResultVal["hauteur"];
        $tableResult["volume"]=$tableResultVal["volume"];
        $tableResult["temp_souhait"]=$tableResultVal["temp_souhait"];
    }

    //if($tableCalcul["temp_ref"]=='-1' || $tableCalcul["temp_ref"]=='-3' || $tableCalcul["temp_ref"]=='-5' || $tableCalcul["temp_ref"]=='-7' || $tableCalcul["temp_ref"]=='-9' || $tableCalcul["temp_ref"]=='-11' || $tableCalcul["temp_ref"]=='-13' || $tableCalcul["temp_ref"]=='-15' ){
    //  $tableCalcul["pair_temp"]=$tableCalcul["temp_ref"]-1;
    //}else{
      $tableCalcul["pair_temp"]=$tableCalcul["temp_ref"];
    //}




    if($tableResultVal["altitude"]!='' && $tableCalcul["pair_temp"]!=''){
      getTempCorrec($tableResultVal["altitude"], $tableCalcul["pair_temp"]);
    }else{
      openPage(102);
    }

}








function getTempCorrec(altitude, pair_temp){
  req_tempCorrec = "SELECT corr_"+$tableResultVal["altitude"]+" as correction FROM correc_altitude where ref="+$tableCalcul["pair_temp"]+";";
  db.transaction(queryTempCorrec, errorCB);
}



function queryTempCorrec(tx){
  tx.executeSql(req_tempCorrec, [], success_tempCorrec, errorCB);
}


function success_tempCorrec(tx, results){

  if (!results.rowsAffected) {
      alert('Correction de temperature non trouvee !');
      return false;
  }


  $tableCalcul["temp_corrige"]=results.rows.item(0).correction;

  openPage(102);

}



function getCoeffG(){

  req_coeffG = "SELECT "+$tableResult["zone"]+" as coeff FROM coeff where type='"+$tableResultVal["logement"]+"' and date='"+$tableResultVal["construction"]+"';";
  db.transaction(querycoeffG, errorCB);
}



function querycoeffG(tx){
  tx.executeSql(req_coeffG, [], success_coeffG, errorCB);
}


function success_coeffG(tx, results){

  if (!results.rowsAffected) {
      alert('Coeff G non trouve !');
      return false;
  }


  $tableCalcul["coeff_g"]=results.rows.item(0).coeff;

}



var DB_NAME = "thermorchauffdb";
var db;
$bdd_host="localhost";
$bdd_user="USER";
$bdd_pass="PASS";
$bdd="BDD";
var step2_key='';
var step2_value='';
var step3_key='';
var step3_value='';
var last_step3_key='';
var step4_id_conc=0;
var step4_id_thermor=0;
var req_step1='';
var req_step2='';
var req_step3='';

var req_s4='';
var req_s42='';

var step4_ok=false;

$tableUnite = new Array();
$tableTitre = new Array();
$tableChoix = new Array();
$tableChoixGriser = new Array();
$tableResult = new Array();
$tableResultVal = new Array();
$tableCalcul = new Array();

$tableDisabled = new Array();


var residentiel=0;
var tertiaire=0;
var deperditions=0;


function clearData(){

  residentiel=0;
  tertiaire=0;
  deperditions=0;


  step4_ok=false;

  $tableDisabled["usage"]=true;

  $tableUnite["departement"]="";
  $tableUnite["zone"]="";
  $tableUnite["logement"]="";
  $tableUnite["construction"]="";
  $tableUnite["altitude"]="m";
  $tableUnite["usage"]="";
  $tableUnite["surface"]="m²";
  $tableUnite["hauteur"]="m";
  $tableUnite["volume"]="m3";
  $tableUnite["temp_souhait"]="°C";

  $tableTitre["departement"]="Département";
  $tableTitre["logement"]="Pièce ou Logement";
  $tableTitre["construction"]="Construction";
  $tableTitre["altitude"]="Altitude";
  $tableTitre["usage"]="Usage";
  $tableTitre["surface"]="Surface";
  $tableTitre["hauteur"]="Hauteur";
  $tableTitre["volume"]="Volume";
  $tableTitre["temp_souhait"]="Température";

  $tableChoix["departement"]="Département";
  $tableChoix["zone"]="Zone Climatique";
  $tableChoix["logement"]="Type de Logement";
  $tableChoix["construction"]="Date de construction";
  $tableChoix["altitude"]="Altitude";
  $tableChoix["usage"]="Usage du logement";
  $tableChoix["surface"]="Surface de la pièce ou du logement";
  $tableChoix["hauteur"]="Hauteur sous plafond";
  $tableChoix["volume"]="Volume";
  $tableChoix["temp_souhait"]="T° intérieure souhaitée";

  $tableChoixGriser["departement"]=false;
  $tableChoixGriser["zone"]=true;
  $tableChoixGriser["logement"]=false;
  $tableChoixGriser["construction"]=false;
  $tableChoixGriser["altitude"]=false;
  $tableChoixGriser["usage"]=false;
  $tableChoixGriser["surface"]=false;
  $tableChoixGriser["hauteur"]=false;
  $tableChoixGriser["volume"]=true;
  $tableChoixGriser["temp_souhait"]=false;


  $tableResult["departement"]="";
  $tableResult["zone"]="";
  $tableResult["logement"]="";
  $tableResult["construction"]="";
  $tableResult["altitude"]="";
  $tableResult["usage"]="";
  $tableResult["surface"]="";
  $tableResult["hauteur"]="";
  $tableResult["volume"]="";
  $tableResult["temp_souhait"]="";

  $tableResultVal["departement"]="";
  $tableResultVal["zone"]="";
  $tableResultVal["logement"]="";
  $tableResultVal["construction"]="";
  $tableResultVal["altitude"]="";
  $tableResultVal["usage"]="";
  $tableResultVal["surface"]="";
  $tableResultVal["hauteur"]="";
  $tableResultVal["volume"]="";
  $tableResultVal["temp_souhait"]="";


  $tableCalcul["temp_ref"]="";
  $tableCalcul["temp_corrige"]="";
  $tableCalcul["pair_temp"]="";
  $tableCalcul["correc_alt"]="";
  $tableCalcul["coeff_g"]="";

  $tableResult_count=0;

}

clearData();






function thr_count(table){
    $i=0;
    for($key in table){
        if(table[$key]!='') $i++;
    }
    return $i;
}




var DEFAULT_LOCAL = "en-US",
    Page,
    assets = [
        "assets/images/bgr.png",
        "assets/images/bgr_start.png",
        "assets/images/button_blue.png",
        "assets/images/button_dark_blue.png",
        "assets/images/button_gray.png",
        "assets/images/button_pink.png",
        "assets/images/button_shadow.png",
        "assets/images/button_shadow_light.png",
        "assets/images/button_yellow.png",
        "assets/images/icon_57x57.png",
        "assets/images/icon_72x72.png",
        "assets/images/icon_114x114.png",
        "assets/images/icon_144x144.png",
        "assets/images/img_ad.png",
        "assets/images/input_border.png",
        "assets/images/logo.png",
        "assets/images/logo_shadow.png",
        "assets/images/pre_loading.jpg",
        "assets/images/presents.png",
        "assets/images/progress-bar-colors.png",
        "assets/images/screw.png",
        "assets/images/step_01.jpg",
        "assets/images/step_02.jpg",
        "assets/images/step_03.jpg",
        "assets/images/step_04.jpg",
        "assets/images/step_05.jpg",
        "assets/images/switch_button.png"
    ],

    phrases = {
        "it": {
            "specific": [
                [
                    {
                        "translate": "You are more beautiful than the Sistine Chapel",
                        "sound": "assets/sounds/Italian 01.aac",
                        "text": "Sei molto più bella della Cappella Sistina"
                    },
                    {
                        "translate": "Have you been to the leaning tower of Pizza?",
                        "sound": "assets/sounds/Italian 02.aac",
                        "text": "Sono io la torre di Pisa... solo che io non pendo."
                    }
                ],
                [
                    {
                        "translate": "You have gorgeous ear lobes…",
                        "sound": "assets/sounds/Italian 03.aac",
                        "text": "Hai dei meravigliosi lobi delle orecchie..."
                    },
                    {
                        "translate": "I head-butted a horse once",
                        "sound": "assets/sounds/Italian 04.aac",
                        "text": "Una volta ho dato una testata a un cavallo"
                    },
                    {
                        "translate": "My Dad’s the capital of bacon",
                        "sound": "assets/sounds/Italian 05.aac",
                        "text": "Mio padre è il principe della pizza"
                    },
                    {
                        "translate": "I think you’ve had enough",
                        "sound": "assets/sounds/Italian 06.aac",
                        "text": "Mi sa che ti è bastato"
                    },
                    {
                        "translate": "Want a drink… up to the value of say, €2?",
                        "sound": "assets/sounds/Italian 07.aac",
                        "text": "Ti va qualcosa da bere... diciamo entro i 2 euro?"
                    }
                ]
            ],
            "other": [
                [
                    {
                        "translate": "I’ve lost my phone. Could you call it to see if it rings?",
                        "sound": "assets/sounds/Italian 08.aac",
                        "text": "Ho perso il telefonino. Puoi provare a farlo squillare per favore?"
                    },
                    {
                        "translate": "See my friend over there? He wants to know if you think I’m fit",
                        "sound": "assets/sounds/Italian 09.aac",
                        "text": "Vedi quel mio amico laggiù? Vorrebbe sapere se mi trovi in forma"
                    },
                    {
                        "translate": "Excuse me, would you take a photo of me and my friends?",
                        "sound": "assets/sounds/Italian 10.aac",
                        "text": "Scusa, potresti per favore fare una foto a me e ai miei amici?"
                    },
                    {
                        "translate": "Excuse me, I’m lost… In your eyes.",
                        "sound": "assets/sounds/Italian 11.aac",
                        "text": "Scusa, mi sono perso... Nei tuoi occhi."
                    },
                    {
                        "translate": "Hi, can you show me the way back to your hotel room?",
                        "sound": "assets/sounds/Italian 12.aac",
                        "text": "Ciao, mi mostri la strada per tornare alla tua camera d'albergo?"
                    },
                    {
                        "translate": "Wow! I didn’t read about you in the travel guide!",
                        "sound": "assets/sounds/Italian 13.aac",
                        "text": "Caspita, come mai sulla guida turistica non ti hanno citata?"
                    }
                ],
                [
                    {
                        "translate": "You really remind me of my uncle",
                        "sound": "assets/sounds/Italian 14.aac",
                        "text": "Mi ricordi proprio mio zio"
                    },
                    {
                        "translate": "What are your thoughts on the European Union?",
                        "sound": "assets/sounds/Italian 15.aac",
                        "text": "Cosa pensi dell’Unione Europea?"
                    },
                    {
                        "translate": "Hi girls – I’ve got in-growing nipples! Want to see?",
                        "sound": "assets/sounds/Italian 16.aac",
                        "text": "Ciao ragazze, ho i capezzoli introflessi. Volete vederli?"
                    },
                    {
                        "translate": "I have no idea what I’m saying",
                        "sound": "assets/sounds/Italian 17.aac",
                        "text": "Non ho idea di quel che sto dicendo"
                    },
                    {
                        "translate": "I lost my teddy bear – will you sleep with me instead?",
                        "sound": "assets/sounds/Italian 18.aac",
                        "text": "Ho perso il mio orsacchiotto! Ci verresti tu al suo posto?"
                    }
                ]
            ],
            "bar": [
                [
                    {
                        "translate": "Hi, I’m doing a survey... What’s your name?",
                        "sound": "assets/sounds/Italian 19.aac",
                        "text": "Salve, sto facendo un sondaggio. Come ti chiami?"
                    },
                    {
                        "translate": "What’s your phone number? Would you like a drink?",
                        "sound": "assets/sounds/Italian 20.aac",
                        "text": "Qual è il tuo numero di telefono? Ti va qualcosa da bere?"
                    },
                    {
                        "translate": "It’s pretty loud in here – shall we go somewhere quieter?",
                        "sound": "assets/sounds/Italian 21.aac",
                        "text": "Che baccano qui dentro. Andiamo in un posto più tranquillo?"
                    },
                    {
                        "translate": "Hi, I can’t find my Mommy – will you take me home?",
                        "sound": "assets/sounds/Italian 22.aac",
                        "text": "Ciao, non trovo la mamma. Mi accompagni a casa?"
                    },
                    {
                        "translate": "Would you like sex on the beach? I mean a Sex on the Beach!",
                        "sound": "assets/sounds/Italian 23.aac",
                        "text": "Ti andrebbe del Sex on the Beach? Intendo il cocktail..."
                    },
                    {
                        "translate": "You’re beautiful – would you like to dance?",
                        "sound": "assets/sounds/Italian 24.aac",
                        "text": "Sei bellissima... ti va di ballare?"
                    },
                    {
                        "translate": "Can me and my friends join you?",
                        "sound": "assets/sounds/Italian 25.aac",
                        "text": "Io e i miei amici possiamo unirci a voi?"
                    }
                ],
                []
            ],
            "pool": [
                [
                    {
                        "translate": "Feel my shorts. You know what that is? That’s boyfriend material.",
                        "sound": "assets/sounds/Italian 26.aac",
                        "text": "Senti un po’ questo tessuto... È un materiale speciale... Io!"
                    },
                    {
                        "translate": "Are you tired? ‘Cause you’ve been swimming around my head all day…",
                        "sound": "assets/sounds/Italian 27.aac",
                        "text": "Sei stanca? No, perché è tutto il giorno che penso a te..."
                    },
                    {
                        "translate": "That bikini really brings out your… eyes",
                        "sound": "assets/sounds/Italian 28.aac",
                        "text": "Quel bikini valorizza molto i tuoi... occhi"
                    },
                    {
                        "translate": "Can I share your sunbed?",
                        "sound": "assets/sounds/Italian 29.aac",
                        "text": "Posso sdraiarmi anch’io sul tuo lettino?"
                    },
                    {
                        "translate": "Fancy joining me for a couple of lengths?",
                        "sound": "assets/sounds/Italian 30.aac",
                        "text": "Ti va di farti un paio di vasche con me?"
                    },
                    {
                        "translate": "I’m really good at ‘breast stroke’… shall I show you?",
                        "sound": "assets/sounds/Italian 31.aac",
                        "text": "Sono un campione di... immersioni. Vuoi vedere?"
                    }
                ],
                [
                    {
                        "translate": "I’ve just had a nice big wee in the pool",
                        "sound": "assets/sounds/Italian 32.aac",
                        "text": "Ho appena fatto una fantastica pipì nella piscina"
                    },
                    {
                        "translate": "Chlorine gives me a botty rash",
                        "sound": "assets/sounds/Italian 33.aac",
                        "text": "Il cloro mi irrita le chiappe"
                    },
                    {
                        "translate": "Do you like the sun? I like the sun. It’s yellow.",
                        "sound": "assets/sounds/Italian 34.aac",
                        "text": "Ti piace il sole? A me sì. È giallo."
                    },
                    {
                        "translate": "I have eleven verrucas – want to see?",
                        "sound": "assets/sounds/Italian 35.aac",
                        "text": "Ho undici verruche. Le vuoi vedere?"
                    },
                    {
                        "translate": "Excuse me; will you put sun cream on my bum?",
                        "sound": "assets/sounds/Italian 36.aac",
                        "text": "Scusa, mi metteresti la crema solare sulle natiche?"
                    }
                ]
            ],
            "beach": [
                [
                    {
                        "translate": "Will you help me build a sand castle?",
                        "sound": "assets/sounds/Italian 37.aac",
                        "text": "Mi aiuti a costruire un castello di sabbia?"
                    },
                    {
                        "translate": "Can I buy you an ice cream?",
                        "sound": "assets/sounds/Italian 38.aac",
                        "text": "Posso offrirti un gelato?"
                    },
                    {
                        "translate": "Would you like sex on the beach? Or a different drink?",
                        "sound": "assets/sounds/Italian 39.aac",
                        "text": "Ti va del sex on the beach? Voglio dire... il cocktail!"
                    },
                    {
                        "translate": "Is there room on that towel for me?",
                        "sound": "assets/sounds/Italian 40.aac",
                        "text": "C’è spazio anche per me su quell’asciugamano?"
                    },
                    {
                        "translate": "I’m here! Who ordered the foot massage?",
                        "sound": "assets/sounds/Italian 41.aac",
                        "text": "Eccomi! Chi ha ordinato un massaggio ai piedi?"
                    },
                    {
                        "translate": "You’re so hot. Fancy a dip to cool off?",
                        "sound": "assets/sounds/Italian 42.aac",
                        "text": "Sei così bella che abbagli. Ti va di fare un bagno?"
                    },
                    {
                        "translate": "Excuse me; can you rub sun cream on my back?",
                        "sound": "assets/sounds/Italian 43.aac",
                        "text": "Scusa, mi massaggeresti la crema solare sulla schiena?"
                    }
                ],
                [
                    {
                        "translate": "You need to shave your back – it’s very hairy",
                        "sound": "assets/sounds/Italian 44.aac",
                        "text": "Devi depilarti la schiena... è superpelosa!"
                    },
                    {
                        "translate": "Excuse me; do you know where the nudist beach is?",
                        "sound": "assets/sounds/Italian 45.aac",
                        "text": "Scusa, sai da che parte è la spiaggia nudista?"
                    },
                    {
                        "translate": "Will you marry me?",
                        "sound": "assets/sounds/Italian 46.aac",
                        "text": "Mi vuoi sposare?"
                    },
                    {
                        "translate": "Hi girls; do you like my belly button?",
                        "sound": "assets/sounds/Italian 47.aac",
                        "text": "Ciao ragazze, vi piace il mio ombelico?"
                    },
                    {
                        "translate": "Excuse me; do I have a sunburnt penis… on my back?",
                        "sound": "assets/sounds/Italian 48.aac",
                        "text": "Scusate, ho per caso sulla schiena un segno dell’abbronzatura a forma di pene?"
                    }
                ]
            ]
        }, "es": {
            "specific": [
                [
                    {
                        "translate": "Fancy joining me for a siesta?",
                        "sound": "assets/sounds/Spanish 01.aac",
                        "text": "Voy a echarme una siesta. ¿Te apuntas?"
                    },
                    {
                        "translate": "Spanish girls are the most beautiful in the world. Tell me – where are you from..?",
                        "sound": "assets/sounds/Spanish 02.aac",
                        "text": "Las chicas españolas son las más guapas del mundo. Dime, ¿tú de dónde eres?"
                    }
                ],
                [
                    {
                        "translate": "You have gorgeous ear lobes…",
                        "sound": "assets/sounds/Spanish 03.aac",
                        "text": "Tienes unos lóbulos de las orejas fascinantes…"
                    },
                    {
                        "translate": "I head-butted a horse once",
                        "sound": "assets/sounds/Spanish 04.aac",
                        "text": "Una vez le pegué un cabezazo a un caballo"
                    },
                    {
                        "translate": "My Dad’s the capital of bacon",
                        "sound": "assets/sounds/Spanish 05.aac",
                        "text": "Mi Madre es la capital del gazpacho"
                    },
                    {
                        "translate": "My Dad’s the capital of bacon",
                        "sound": "assets/sounds/Spansih 05 ALT.aac",
                        "text": "Mi Madre es la capital del gazpacho"
                    },
                    {
                        "translate": "I think you’ve had enough",
                        "sound": "assets/sounds/Spanish 06.aac",
                        "text": "Creo que ya tienes bastante"
                    },
                    {
                        "translate": "Want a drink… up to the value of say, €2?",
                        "sound": "assets/sounds/Spanish 07.aac",
                        "text": "¿Quieres tomar algo que no pase de, digamos, 2 €?"
                    }
                ]
            ],
            "other": [
                [],
                [
                    {
                        "translate": "I’ve lost my phone. Could you call it to see if it rings?",
                        "sound": "assets/sounds/Spanish 08.aac",
                        "text": "He perdido el teléfono. ¿Puedes llamar para ver si suena?"
                    },
                    {
                        "translate": "See my friend over there? He wants to know if you think I’m fit",
                        "sound": "assets/sounds/Spanish 09.aac",
                        "text": "¿Ves a mi amigo que está ahí? Quiere saber si crees que estoy bueno"
                    },
                    {
                        "translate": "Excuse me, would you take a photo of me and my friends?",
                        "sound": "assets/sounds/Spanish 10.aac",
                        "text": "Perdona, ¿nos haces una foto a mí y a mis amigos?"
                    },
                    {
                        "translate": "Excuse me, I’m lost… In your eyes.",
                        "sound": "assets/sounds/Spanish 11.aac",
                        "text": "Perdona, me he perdido… en tu mirada."
                    },
                    {
                        "translate": "Hi, can you show me the way back to your hotel room?",
                        "sound": "assets/sounds/Spanish 12.aac",
                        "text": "Hola, ¿me puedes indicar el camino de vuelta a tu habitación del hotel?"
                    },
                    {
                        "translate": "Wow! I didn’t read about you in the travel guide!",
                        "sound": "assets/sounds/Spanish 13.aac",
                        "text": "Guau, ¿cómo es que no aparece tu nombre en la guía turística!"
                    },
                    {
                        "translate": "You really remind me of my uncle",
                        "sound": "assets/sounds/Spanish 14.aac",
                        "text": "De verdad que me recuerdas a mi tío"
                    },
                    {
                        "translate": "What are your thoughts on the European Union?",
                        "sound": "assets/sounds/Spanish 15.aac",
                        "text": "¿Qué opinas del Tratado de la Unión Europea?"
                    },
                    {
                        "translate": "Hi girls – I’ve got in-growing nipples! Want to see?",
                        "sound": "assets/sounds/Spanish 16.aac",
                        "text": "Hola chicas, ¡tengo pezones enterrados! ¿Queréis verlos?"
                    },
                    {
                        "translate": "I have no idea what I’m saying",
                        "sound": "assets/sounds/Spanish 17.aac",
                        "text": "No tengo ni idea de lo que estoy diciendo"
                    },
                    {
                        "translate": "I lost my teddy bear – will you sleep with me instead?",
                        "sound": "assets/sounds/Spanish 18.aac",
                        "text": "He perdido mi osito de peluche… ¿quieres dormir conmigo en su lugar?"
                    }
                ]
            ],
            "bar": [
                [
                    {
                        "translate": "Hi, I’m doing a survey... What’s your name? What’s your phone number? Would you like a drink?",
                        "sound": "assets/sounds/Spanish 19.aac",
                        "text": "Hola, estoy haciendo una encuesta… ¿Cómo te llamas? ¿Cuál es tu número de teléfono? ¿Te apetece tomar algo?"
                    },
                    {
                        "translate": "It’s pretty loud in here – shall we go somewhere quieter?",
                        "sound": "assets/sounds/Spanish 20.aac",
                        "text": "La música está muy fuerte… ¿nos vamos a algún sitio más tranquilo?"
                    },
                    {
                        "translate": "Hi, I can’t find my Mommy – will you take me home?",
                        "sound": "assets/sounds/Spanish 21.aac",
                        "text": "Hola, no encuentro a mi mamá… ¿me llevas a casa?"
                    },
                    {
                        "translate": "Would you like sex on the beach? I mean a Sex on the Beach!",
                        "sound": "assets/sounds/Spanish 22.aac",
                        "text": "¿Quieres \"Sex on the Beach\"? ¡Eh, que es el nombre de un cóctel!"
                    },
                    {
                        "translate": "You’re beautiful – would you like to dance?",
                        "sound": "assets/sounds/Spanish 23.aac",
                        "text": "Eres preciosa… ¿quieres bailar?"
                    },
                    {
                        "translate": "Can me and my friends join you?",
                        "sound": "assets/sounds/Spanish 24.aac",
                        "text": "¿Te molesta si mis amigos y yo nos unimos?"
                    }
                ],
                []
            ],
            "pool": [
                [
                    {
                        "translate": "Feel my shorts. You know what that is? That’s boyfriend material.",
                        "sound": "assets/sounds/Spanish 25.aac",
                        "text": "Toca mi bañador. ¿Sabes lo que es eso? De lo que están hechos los hombres."
                    },
                    {
                        "translate": "Are you tired? ‘Cause you’ve been swimming around my head all day…",
                        "sound": "assets/sounds/Spanish 26.aac",
                        "text": "Debes estar cansada, porque llevas todo el día nadando en mi cabeza…"
                    },
                    {
                        "translate": "That bikini really brings out your… eyes",
                        "sound": "assets/sounds/Spanish 27.aac",
                        "text": "Ese bikini de verdad realza… tus ojos."
                    },
                    {
                        "translate": "Can I share your sunbed?",
                        "sound": "assets/sounds/Spanish 28.aac",
                        "text": "¿Puedo compartir la tumbona contigo?"
                    },
                    {
                        "translate": "Fancy joining me for a couple of lengths?",
                        "sound": "assets/sounds/Spanish 29.aac",
                        "text": "¿Nos hacemos unos largos?"
                    },
                    {
                        "translate": "I’m really good at ‘breast stroke’… shall I show you?",
                        "sound": "assets/sounds/Spanish 30.aac",
                        "text": "El truco para nadar a braza es sacar pecho… ¿a ver cómo lo haces?"
                    }
                ],
                [
                    {
                        "translate": "I’ve just had a nice big wee in the pool",
                        "sound": "assets/sounds/Spanish 31.aac",
                        "text": "Acabo de pegarme la gran meada en la piscina"
                    },
                    {
                        "translate": "I’ve just had a nice big wee in the pool",
                        "sound": "assets/sounds/Spanish 31 ALT.aac",
                        "text": "Acabo de pegarme la gran meada en la piscina"
                    },
                    {
                        "translate": "Chlorine gives me a botty rash",
                        "sound": "assets/sounds/Spanish 32.aac",
                        "text": "El cloro de la piscina me irrita el culo"
                    },
                    {
                        "translate": "Do you like the sun? I like the sun. It’s yellow.",
                        "sound": "assets/sounds/Spanish 33.aac",
                        "text": "¿Te gusta el sol? A mí, sí. Es amarillo."
                    },
                    {
                        "translate": "I have eleven verrucas – want to see?",
                        "sound": "assets/sounds/Spanish 34.aac",
                        "text": "Me han salido once verrugas. ¿Quieres verlas?"
                    },
                    {
                        "translate": "Excuse me; will you put sun cream on my bum?",
                        "sound": "assets/sounds/Spanish 35.aac",
                        "text": "Perdona, ¿me puedes poner crema solar en las nalgas?"
                    }
                ]
            ],
            "beach": [
                [
                    {
                        "translate": "Will you help me build a sand castle?",
                        "sound": "assets/sounds/Spanish 36.aac",
                        "text": "¿Me ayudas a construir un castillo de arena?"
                    },
                    {
                        "translate": "Can I buy you an ice cream?",
                        "sound": "assets/sounds/Spanish 37.aac",
                        "text": "¿Puedo comprarte un helado?"
                    },
                    {
                        "translate": "Would you like sex on the beach? Or a different drink?",
                        "sound": "assets/sounds/Spanish 38.aac",
                        "text": "¿Quieres \"Sex on the Beach\"? ¡Eh, que es el nombre de un cóctel!"
                    },
                    {
                        "translate": "Is there room on that towel for me?",
                        "sound": "assets/sounds/Spanish 39.aac",
                        "text": "¿Hay espacio en esa toalla para mí?"
                    },
                    {
                        "translate": "I’m here! Who ordered the foot massage?",
                        "sound": "assets/sounds/Spanish 40.aac",
                        "text": "¡Aquí estoy! ¿Quién ha pedido un masaje de pies?"
                    },
                    {
                        "translate": "You’re so hot. Fancy a dip to cool off?",
                        "sound": "assets/sounds/Spanish 41.aac",
                        "text": "Me pones caliente. ¿Nos refrescamos un poco?"
                    },
                    {
                        "translate": "Excuse me; can you rub sun cream on my back?",
                        "sound": "assets/sounds/Spanish 42.aac",
                        "text": "Perdona, ¿me puedes poner crema solar en la espalda?"
                    }
                ],
                [
                    {
                        "translate": "You need to shave your back – it’s very hairy",
                        "sound": "assets/sounds/Spanish 43.aac",
                        "text": "Deberías depilarte la espalda, es super peluda"
                    },
                    {
                        "translate": "Excuse me; do you know where the nudist beach is?",
                        "sound": "assets/sounds/Spanish 44.aac",
                        "text": "Perdona, ¿sabes dónde está la playa nudista?"
                    },
                    {
                        "translate": "Will you marry me?",
                        "sound": "assets/sounds/Spanish 45.aac",
                        "text": "¿Quieres casarte conmigo?"
                    },
                    {
                        "translate": "Hi girls; do you like my belly button?",
                        "sound": "assets/sounds/Spanish 46.aac",
                        "text": "Hola chicas, ¿os gusta mi ombligo?"
                    },
                    {
                        "translate": "Excuse me; do I have a sunburnt penis… on my back?",
                        "sound": "assets/sounds/Spanish 47.aac",
                        "text": "Perdona. ¿Es verdad que tengo una quemadura solar en forma de pene... en la espalda?"
                    }
                ]
            ]
        }, "fr": {
            "specific": [
                [
                    {
                        "translate": "You’re French! I live next door to Thierry Henry…",
                        "sound": "assets/sounds/French 01.aac",
                        "text": "Tu es française ? Oh, j'habite à côté de Thierry Henry…"
                    },
                    {
                        "translate": "Will you go to bed with me tadpole?",
                        "sound": "assets/sounds/French 02.aac",
                        "text": "Tu dors avec moi têtard ?"
                    },
                    {
                        "translate": "Will you go to bed with three tonight?",
                        "sound": "assets/sounds/French 03.aac",
                        "text": "On dort à deux ce soir ou tu préfères à trois ?\n"
                    },
                    {
                        "translate": "Will you go to bed with three tonight?",
                        "sound": "assets/sounds/French 03 ALT.aac",
                        "text": "Tu dors avec trois ce soir ?"
                    }
                ],
                [
                    {
                        "translate": "You have gorgeous ear lobes…",
                        "sound": "assets/sounds/French 04.aac",
                        "text": "T'as de beaux lobes, tu sais…"
                    },
                    {
                        "translate": "I head-butted a horse once",
                        "sound": "assets/sounds/French 05.aac",
                        "text": "J'ai donné un coup de boule à un taureau une fois"
                    },
                    {
                        "translate": "I head-butted a horse once",
                        "sound": "assets/sounds/French 05 ALT.aac",
                        "text": "J'ai donné un coup de boule à un cheval une fois"
                    },
                    {
                        "translate": "My Dad’s the capital of bacon",
                        "sound": "assets/sounds/French 06.aac",
                        "text": "Mon père est la capitale de la saucisse"
                    },
                    {
                        "translate": "My Dad’s the capital of bacon",
                        "sound": "assets/sounds/French 06 ALT.aac",
                        "text": "Mon père est la capitale du bacon"
                    },
                    {
                        "translate": "I think you’ve had enough",
                        "sound": "assets/sounds/French 07.aac",
                        "text": "Je pense que tu en as eu assez"
                    },
                    {
                        "translate": "Want a drink… up to the value of say, €2?",
                        "sound": "assets/sounds/French 08.aac",
                        "text": "Je t'offre un verre ? Disons dans les 2 € maxi…"
                    }
                ]
            ],
            "other": [
                [
                    {
                        "translate": "I’ve lost my phone. Could you call it to see if it rings?",
                        "sound": "assets/sounds/French 09.aac",
                        "text": "J'ai perdu mon téléphone. Tu peux m'appeler pour voir si ça sonne ?"
                    },
                    {
                        "translate": "See my friend over there? He wants to know if you think I’m fit",
                        "sound": "assets/sounds/French 10.aac",
                        "text": "Tu vois mon ami là-bas ? Il veut savoir si tu me trouves pas mal"
                    },
                    {
                        "translate": "Excuse me, would you take a photo of me and my friends?",
                        "sound": "assets/sounds/French 11.aac",
                        "text": "Excuse-moi, tu peux me prendre en photo avec mes amis ?"
                    },
                    {
                        "translate": "Excuse me, I’m lost… In your eyes.",
                        "sound": "assets/sounds/French 12.aac",
                        "text": "Excuse-moi, je me suis perdu… Dans ton regard."
                    },
                    {
                        "translate": "Hi, can you show me the way back to your hotel room?",
                        "sound": "assets/sounds/French 13.aac",
                        "text": "Salut, tu peux m'indiquer le chemin jusqu'à ta chambre ?"
                    },
                    {
                        "translate": "Hi, can you show me the way back to your hotel room?",
                        "sound": "assets/sounds/French 13 ALT 1.aac",
                        "text": "Salut, tu peux m'indiquer le chemin jusqu'à ton hôtel ?"
                    },
                    {
                        "translate": "Hi, can you show me the way back to your hotel room?",
                        "sound": "assets/sounds/French 13 ALT 2.aac",
                        "text": "Salut, tu peux m'indiquer comment rentrer à l'hôtel ? Je dors dans la même chambre que toi."
                    },
                    {
                        "translate": "Wow! I didn’t read about you in the travel guide!",
                        "sound": "assets/sounds/French 14.aac",
                        "text": "Waouh, et dire que mon guide de voyage ne parle même pas de toi !\n"
                    },
                    {
                        "translate": "Wow! I didn’t read about you in the travel guide!",
                        "sound": "assets/sounds/French ALT.aac",
                        "text": "Waouh, ils ne parlaient pas de toi dans mon guide de voyage !"
                    }
                ],
                [
                    {
                        "translate": "You really remind me of my uncle",
                        "sound": "assets/sounds/French 15.aac",
                        "text": "Tu me rappelles vraiment mon oncle"
                    },
                    {
                        "translate": "What are your thoughts on the European Union?",
                        "sound": "assets/sounds/French 16.aac",
                        "text": "Que penses-tu de l'Union européenne ?"
                    },
                    {
                        "translate": "Hi girls – I’ve got in-growing nipples! Want to see?",
                        "sound": "assets/sounds/French 17.aac",
                        "text": "Salut les filles, j'ai les tétons qui poussent vers l'intérieur ! Vous voulez voir ?"
                    },
                    {
                        "translate": "I have no idea what I’m saying",
                        "sound": "assets/sounds/French 18.aac",
                        "text": "Je n'ai aucune idée de ce que je raconte"
                    },
                    {
                        "translate": "I lost my teddy bear – will you sleep with me instead?",
                        "sound": "assets/sounds/French 19.aac",
                        "text": "J'ai perdu mon ours en peluche, tu veux bien dormir avec moi à sa place ?"
                    }
                ]
            ],
            "bar": [
                [
                    {
                        "translate": "Hi, I’m doing a survey... What’s your name? What’s your phone number? Would you like a drink?",
                        "sound": "assets/sounds/French 20.aac",
                        "text": "Salut, je fais un sondage… Comment tu t'appelles ? Quel est ton numéro de téléphone ? Tu veux boire un verre ?"
                    },
                    {
                        "translate": "It’s pretty loud in here – shall we go somewhere quieter?",
                        "sound": "assets/sounds/French 21.aac",
                        "text": "C'est un peu trop bruyant ici, on va dans un endroit plus calme ?"
                    },
                    {
                        "translate": "Hi, I can’t find my Mommy – will you take me home?",
                        "sound": "assets/sounds/French 22.aac",
                        "text": "Dis, j'ai perdu ma maman, tu peux me ramener à la maison ?"
                    },
                    {
                        "translate": "Would you like sex on the beach? I mean a Sex on the Beach!",
                        "sound": "assets/sounds/French 23.aac",
                        "text": "Envie d'un p'tit coup ? À boire..."
                    },
                    {
                        "translate": "Would you like sex on the beach? I mean a Sex on the Beach!",
                        "sound": "assets/sounds/French 23 ALT.aac",
                        "text": "Sex on the beach ? Je veux dire, tu veux boire un sex on the beach ?"
                    },
                    {
                        "translate": "You’re beautiful – would you like to dance?",
                        "sound": "assets/sounds/French 24.aac",
                        "text": "Tu es belle. Tu danses ?"
                    },
                    {
                        "translate": "Can me and my friends join you?",
                        "sound": "assets/sounds/French 25.aac",
                        "text": "Mes amis et moi, on peut se joindre à vous ?"
                    }
                ],
                []
            ],
            "pool": [
                [
                    {
                        "translate": "Feel my shorts. You know what that is? That’s boyfriend material.",
                        "sound": "assets/sounds/French 26.aac",
                        "text": "Touche mon short. Tu sais ce que c'est comme matière ? Du 100 % love."
                    },
                    {
                        "translate": "Feel my shorts. You know what that is? That’s boyfriend material.",
                        "sound": "assets/sounds/French 26 ALT.aac",
                        "text": "Tu vois mon short ? Tu n'imagines pas comme il est doux au toucher."
                    },
                    {
                        "translate": "Are you tired? ‘Cause you’ve been swimming around my head all day…",
                        "sound": "assets/sounds/French 27.aac",
                        "text": "T'aimes la natation ? Parce qu'avec moi, tu vas nager dans le bonheur."
                    },
                    {
                        "translate": "That bikini really brings out your… eyes",
                        "sound": "assets/sounds/French 28.aac",
                        "text": "Ce bikini fait vraiment ressortir tes… yeux"
                    },
                    {
                        "translate": "Can I share your sunbed?",
                        "sound": "assets/sounds/French 29.aac",
                        "text": "Tu me fais une place sur ton transat ?"
                    },
                    {
                        "translate": "Fancy joining me for a couple of lengths?",
                        "sound": "assets/sounds/French 30.aac",
                        "text": "On se fait quelques longueurs ? Je suis très endurant.\n"
                    },
                    {
                        "translate": "Fancy joining me for a couple of lengths?",
                        "sound": "assets/sounds/French 30 ALT.aac",
                        "text": "On se fait quelques longueurs ensemble ?"
                    },
                    {
                        "translate": "I’m really good at ‘breast stroke’… shall I show you?",
                        "sound": "assets/sounds/French 31.aac",
                        "text": "Je suis bon en brasse… Quand j'embrasse aussi. Je te montre ?"
                    }
                ],
                [
                    {
                        "translate": "I’ve just had a nice big wee in the pool",
                        "sound": "assets/sounds/French 32.aac",
                        "text": "Je viens juste de faire un gros pipi dans la piscine"
                    },
                    {
                        "translate": "Chlorine gives me a botty rash",
                        "sound": "assets/sounds/French 33.aac",
                        "text": "Le chlore m'irrite les fesses"
                    },
                    {
                        "translate": "Do you like the sun? I like the sun. It’s yellow.",
                        "sound": "assets/sounds/French 34.aac",
                        "text": "Tu aimes le soleil ? J'aime le soleil. Il est jaune."
                    },
                    {
                        "translate": "I have eleven verrucas – want to see?",
                        "sound": "assets/sounds/French 35.aac",
                        "text": "J'ai onze verrues. Tu veux les voir ?"
                    },
                    {
                        "translate": "Excuse me; will you put sun cream on my bum?",
                        "sound": "assets/sounds/French 36.aac",
                        "text": "Excuse-moi, tu veux bien me mettre de la crème sur les fesses ?"
                    }
                ]
            ],
            "beach": [
                [
                    {
                        "translate": "Will you help me build a sand castle?",
                        "sound": "assets/sounds/French 37.aac",
                        "text": "Tu veux m'aider à construire un château de sable ?"
                    },
                    {
                        "translate": "Can I buy you an ice cream?",
                        "sound": "assets/sounds/French 38.aac",
                        "text": "Je peux t'offrir une glace ?"
                    },
                    {
                        "translate": "Would you like sex on the beach? Or a different drink?",
                        "sound": "assets/sounds/French 39.aac",
                        "text": "Sex on the beach, ça te tente ? Ou tu préfères autre chose à boire ?"
                    },
                    {
                        "translate": "Is there room on that towel for me?",
                        "sound": "assets/sounds/French 40.aac",
                        "text": "Y a une petite place pour moi sur cette serviette ?"
                    },
                    {
                        "translate": "I’m here! Who ordered the foot massage?",
                        "sound": "assets/sounds/French 41.aac",
                        "text": "Me voilà ! Qui a commandé un massage des pieds ?"
                    },
                    {
                        "translate": "You’re so hot. Fancy a dip to cool off?",
                        "sound": "assets/sounds/French 42.aac",
                        "text": "Mmm, tu me donnes chaud. On va se baigner pour se rafraîchir ?"
                    },
                    {
                        "translate": "Excuse me; can you rub sun cream on my back?",
                        "sound": "assets/sounds/French 43.aac",
                        "text": "Excuse-moi, tu peux me mettre de la crème dans le dos ?"
                    }
                ],
                [
                    {
                        "translate": "You need to shave your back – it’s very hairy",
                        "sound": "assets/sounds/French 44.aac",
                        "text": "Tu devrais t'épiler le dos, il est vraiment poilu."
                    },
                    {
                        "translate": "Excuse me; do you know where the nudist beach is?",
                        "sound": "assets/sounds/French 45.aac",
                        "text": "Excuse-moi, tu sais où se trouve la plage naturiste ?"
                    },
                    {
                        "translate": "Will you marry me?",
                        "sound": "assets/sounds/French 46.aac",
                        "text": "Tu veux m'épouser ?"
                    },
                    {
                        "translate": "Hi girls; do you like my belly button?",
                        "sound": "assets/sounds/French 47.aac",
                        "text": "Salut les filles, vous aimez mon nombril ?"
                    },
                    {
                        "translate": "Excuse me; do I have a sunburnt penis… on my back?",
                        "sound": "assets/sounds/French 48.aac",
                        "text": "Excuse-moi, est-ce que j'ai pris un coup de soleil autour du pénis… dans mon dos ?"
                    }
                ]
            ]
        }, "de": {
            "specific": [
                [
                    {
                        "translate": "Do you want to put your towel out on my bed?",
                        "sound": "assets/sounds/German 01.aac",
                        "text": "Möchtest du dein Strandtuch auf mein Bett legen?"
                    },
                    {
                        "translate": "Did I see you at the Champion’s League final?",
                        "sound": "assets/sounds/German 02.aac",
                        "text": "Habe ich dich nicht beim Champions League-Finale gesehen?"
                    }
                ],
                [
                    {
                        "translate": "You have gorgeous ear lobes…",
                        "sound": "assets/sounds/German 03.aac",
                        "text": "Du hast wirklich süße Ohrläppchen …"
                    },
                    {
                        "translate": "I head-butted a horse once",
                        "sound": "assets/sounds/German 04.aac",
                        "text": "Ich habe übrigens schon mal einem Pferd eine Kopfnuss gegeben."
                    },
                    {
                        "translate": "My Dad’s the capital of bacon",
                        "sound": "assets/sounds/German 05.aac",
                        "text": "Mein Vater ist die Hauptstadt von Bratwurst."
                    },
                    {
                        "translate": "I think you’ve had enough",
                        "sound": "assets/sounds/German 06.aac",
                        "text": "Ich denke, du hast jetzt genug."
                    },
                    {
                        "translate": "Want a drink… up to the value of say, €2?",
                        "sound": "assets/sounds/German 07.aac",
                        "text": "Möchtest du einen Drink … sagen wir mal für bis zu 2 €?"
                    }
                ]
            ],
            "other": [
                [
                    {
                        "translate": "I’ve lost my phone. Could you call it to see if it rings?",
                        "sound": "assets/sounds/German 08.aac",
                        "text": "Ich habe mein Handy verloren. Kannst du mich mal anrufen, damit ich höre, wo es klingelt?"
                    },
                    {
                        "translate": "See my friend over there? He wants to know if you think I’m fit",
                        "sound": "assets/sounds/German 09.aac",
                        "text": "Siehst du meinen Freund da drüben? Der würde gerne wissen, ob du mich gut findest."
                    },
                    {
                        "translate": "Excuse me, would you take a photo of me and my friends?",
                        "sound": "assets/sounds/German 10.aac",
                        "text": "Entschuldige, würdest du ein Foto von mir und meinen Freunden machen?"
                    },
                    {
                        "translate": "Excuse me, I’m lost… In your eyes.",
                        "sound": "assets/sounds/German 11.aac",
                        "text": "Entschuldige, ich wurde gerade hypnotisiert … von deinen Augen."
                    },
                    {
                        "translate": "Hi, can you show me the way back to your hotel room?",
                        "sound": "assets/sounds/German 12.aac",
                        "text": "Hi, kannst du mir den Weg zu deinem Hotel zeigen?"
                    },
                    {
                        "translate": "Wow! I didn’t read about you in the travel guide!",
                        "sound": "assets/sounds/German 13.aac",
                        "text": "Wow! Wieso stand von dir nichts im Reiseführer?"
                    }
                ],
                [
                    {
                        "translate": "You really remind me of my uncle",
                        "sound": "assets/sounds/German 14.aac",
                        "text": "Du erinnerst mich echt an meinen Onkel."
                    },
                    {
                        "translate": "What are your thoughts on the European Union?",
                        "sound": "assets/sounds/German 15.aac",
                        "text": "Was hältst du eigentlich von der Europäischen Union?"
                    },
                    {
                        "translate": "Hi girls – I’ve got in-growing nipples! Want to see?",
                        "sound": "assets/sounds/German 16.aac",
                        "text": "Hey Mädels, ich habe eingewachsene Brustwarzen. Wollt ihr mal sehen?"
                    },
                    {
                        "translate": "I have no idea what I’m saying",
                        "sound": "assets/sounds/German 17.aac",
                        "text": "Ich habe keine Ahnung, was ich hier erzähle."
                    },
                    {
                        "translate": "I lost my teddy bear – will you sleep with me instead?",
                        "sound": "assets/sounds/German 18.aac",
                        "text": "Mein Teddybär ist verschwunden. Würdest du stattdessen bei mir schlafen?"
                    }
                ]
            ],
            "bar": [
                [
                    {
                        "translate": "Hi, I’m doing a survey... What’s your name? What’s your phone number? Would you like a drink?",
                        "sound": "assets/sounds/German 19.aac",
                        "text": "Hi, ich mache eine Umfrage … Wie heißt du? Was ist deine Handynummer? Möchtest du was trinken?"
                    },
                    {
                        "translate": "It’s pretty loud in here – shall we go somewhere quieter?",
                        "sound": "assets/sounds/German 20.aac",
                        "text": "Ziemlich laut hier, oder? Sollen wir irgendwo hingehen, wo es leiser ist?"
                    },
                    {
                        "translate": "Hi, I can’t find my Mommy – will you take me home?",
                        "sound": "assets/sounds/German 21.aac",
                        "text": "Hi, ich kann meine Mama nicht finden. Bringst du mich nach Hause?"
                    },
                    {
                        "translate": "Would you like sex on the beach? I mean a Sex on the Beach!",
                        "sound": "assets/sounds/German 22.aac",
                        "text": "Hättest du gerne Sex am Strand … äh, ich meine natürlich den Drink."
                    },
                    {
                        "translate": "You’re beautiful – would you like to dance?",
                        "sound": "assets/sounds/German 23.aac",
                        "text": "Du bist wunderschön. Würdest du gerne tanzen?"
                    },
                    {
                        "translate": "Can me and my friends join you?",
                        "sound": "assets/sounds/German 24.aac",
                        "text": "Können meine Freunde und ich zu dir rüberkommen?"
                    }
                ],
                []
            ],
            "pool": [
                [
                    {
                        "translate": "Feel my shorts. You know what that is? That’s boyfriend material.",
                        "sound": "assets/sounds/German 25.aac",
                        "text": "Fass mal meine Shorts an. Und ... weißt du was? So fühlt sich dein neuer Freund an."
                    },
                    {
                        "translate": "Are you tired? ‘Cause you’ve been swimming around my head all day…",
                        "sound": "assets/sounds/German 26.aac",
                        "text": "Bist du müde? Ich meine nur, weil du mir den ganzen Tag durch den Kopf gegangen bist …"
                    },
                    {
                        "translate": "That bikini really brings out your… eyes",
                        "sound": "assets/sounds/German 27.aac",
                        "text": "Dieser Bikini betont wirklich ganz super deine … Augen."
                    },
                    {
                        "translate": "Can I share your sunbed?",
                        "sound": "assets/sounds/German 28.aac",
                        "text": "Darf ich mit auf deine Sonnenliege?"
                    },
                    {
                        "translate": "Fancy joining me for a couple of lengths?",
                        "sound": "assets/sounds/German 29.aac",
                        "text": "Lust, ein paar Bahnen mit mir zu schwimmen?"
                    },
                    {
                        "translate": "I’m really good at ‘breast stroke’… shall I show you?",
                        "sound": "assets/sounds/German 30.aac",
                        "text": "Brust mag ich am liebsten. Soll ich's dir mal zeigen?"
                    }
                ],
                [
                    {
                        "translate": "I’ve just had a nice big wee in the pool",
                        "sound": "assets/sounds/German 31.aac",
                        "text": "Ich habe gerade erst mal richtig satt in den Pool gepinkelt."
                    },
                    {
                        "translate": "Chlorine gives me a botty rash",
                        "sound": "assets/sounds/German 32.aac",
                        "text": "Von Chlor kriege ich immer Pickel am Arsch."
                    },
                    {
                        "translate": "Do you like the sun? I like the sun. It’s yellow.",
                        "sound": "assets/sounds/German 33.aac",
                        "text": "Magst du die Sonne? Ich schon. Die ist nämlich gelb."
                    },
                    {
                        "translate": "I have eleven verrucas – want to see?",
                        "sound": "assets/sounds/German 34.aac",
                        "text": "Ich habe 11 Warzen. Willste mal sehen?"
                    },
                    {
                        "translate": "Excuse me; will you put sun cream on my bum?",
                        "sound": "assets/sounds/German 35.aac",
                        "text": "Entschuldige, könntest du mir vielleicht den Hintern eincremen?"
                    }
                ]
            ],
            "beach": [
                [
                    {
                        "translate": "Will you help me build a sand castle?",
                        "sound": "assets/sounds/German 36.aac",
                        "text": "Hilfst du mir, eine Sandburg zu bauen?"
                    },
                    {
                        "translate": "Can I buy you an ice cream?",
                        "sound": "assets/sounds/German 37.aac",
                        "text": "Soll ich dir ein Eis kaufen?"
                    },
                    {
                        "translate": "Would you like sex on the beach? Or a different drink?",
                        "sound": "assets/sounds/German 38.aac",
                        "text": "Hättest du gerne Sex am Strand … oder lieber einen anderen Drink?"
                    },
                    {
                        "translate": "Is there room on that towel for me?",
                        "sound": "assets/sounds/German 39.aac",
                        "text": "Ist auf dem Handtuch noch Platz für mich?"
                    },
                    {
                        "translate": "I’m here! Who ordered the foot massage?",
                        "sound": "assets/sounds/German 40.aac",
                        "text": "So, da bin ich. Wer hatte hier die Fußmassage bestellt?"
                    },
                    {
                        "translate": "You’re so hot. Fancy a dip to cool off?",
                        "sound": "assets/sounds/German 41.aac",
                        "text": "Du bist echt viel zu heiß. Komm doch mit in den Pool, etwas abkühlen."
                    },
                    {
                        "translate": "Excuse me; can you rub sun cream on my back?",
                        "sound": "assets/sounds/German 42.aac",
                        "text": "Entschuldige, kannst du mir den Rücken eincremen?"
                    }
                ],
                [
                    {
                        "translate": "You need to shave your back – it’s very hairy",
                        "sound": "assets/sounds/German 43.aac",
                        "text": "Du musst mal deinen Rücken rasieren. Der ist echt behaart."
                    },
                    {
                        "translate": "Excuse me; do you know where the nudist beach is?",
                        "sound": "assets/sounds/German 44.aac",
                        "text": "Entschuldige, weißt du, wo der Nacktbadestrand ist?"
                    },
                    {
                        "translate": "Will you marry me?",
                        "sound": "assets/sounds/German 45.aac",
                        "text": "Willst du mich heiraten?"
                    },
                    {
                        "translate": "Hi girls; do you like my belly button?",
                        "sound": "assets/sounds/German 46.aac",
                        "text": "Hey Mädels, gefällt euch mein Bauchnabel?"
                    },
                    {
                        "translate": "Excuse me; do I have a sunburnt penis… on my back?",
                        "sound": "assets/sounds/German 47.aac",
                        "text": "Entschuldige, habe ich einen Penis mit Sonnenbrand … ich meine, auf dem Rücken?"
                    },
                    {
                        "translate": "Excuse me; do I have a sunburnt penis… on my back?",
                        "sound": "assets/sounds/German 47 ALT.aac",
                        "text": "Entschuldige, habe ich einen Penis mit Sonnenbrand … ich meine, auf dem Rücken?"
                    }
                ]
            ]
        }, "en": {
            "other": [
                [
                    {
                        "text": "Fancy one daan the rub-a-dub, darlin’?",
                        "sound": "assets/sounds/Cockney 01.aac",
                        "translate": "Would one like to join me for a drink at the local inn?"
                    },
                    {
                        "text": "You ‘ave beau’iful mincers",
                        "sound": "assets/sounds/Cockney 02.aac",
                        "translate": "I find your eyes truly mesmerising."
                    },
                    {
                        "text": "Corrr blimey – your chevy’s mustard!",
                        "sound": "assets/sounds/Cockney 03.aac",
                        "translate": "Wow – your face is really rather striking."
                    },
                    {
                        "text": "I can’t adam how long your bacons are…",
                        "sound": "assets/sounds/Cockney 04.aac",
                        "translate": "You have amazingly long legs…"
                    },
                    {
                        "text": "That barnet. That boat. That fireman’s... You’re bladdy gawjus!",
                        "sound": "assets/sounds/Cockney 05.aac",
                        "translate": "Your hair is lovely. Your face is just divine. And you have the cutest little nose. You really are stunning."
                    },
                    {
                        "text": "Wanna go twos on a sherbert, love?",
                        "sound": "assets/sounds/Cockney 06.aac",
                        "translate": "Would you mind ever so if we shared a taxi?"
                    },
                    {
                        "text": "I can see your Alans – you look like barney…",
                        "sound": "assets/sounds/Cockney 07.aac",
                        "translate": "I think your underpants might be showing ever so slightly – you look like you’ve got a mischevious side…"
                    },
                    {
                        "text": "Fancy going daan the battlecruiser? I think we’d ‘av a bubble…",
                        "sound": "assets/sounds/Cockney 08.aac",
                        "translate": "Would you like to accompany me to the public house? I have a feeling our personalities would really complement each other…"
                    },
                    {
                        "text": "Would you rather ‘av a gander at me farmers or me orchestra?",
                        "sound": "assets/sounds/Cockney 09.aac",
                        "translate": "Which would you prefer to see; my piles or my privates?"
                    },
                    {
                        "text": "Alright darlin’, how about a kick?",
                        "sound": "assets/sounds/Cockney 10.aac",
                        "translate": "Good evening ma’am, would you care for a dance?"
                    },
                    {
                        "text": "Alright treacle, you ‘av a blindin’ Khyber",
                        "sound": "assets/sounds/Cockney 11.aac",
                        "translate": "Hello my dear, you derrière is really rather ravishing."
                    },
                    {
                        "text": "Are you a bit taters, love? I can see your raspberries.",
                        "sound": "assets/sounds/Cockney 12.aac",
                        "translate": "Your t-shirt would suggest you’re a little chilly."
                    },
                    {
                        "text": "Shall we get aat the currant?",
                        "sound": "assets/sounds/Cockney 13.aac",
                        "translate": "Can I suggest we go and relax in the shade for a while?"
                    },
                    {
                        "text": "Faancy a ruby, swee’art?",
                        "sound": "assets/sounds/Cockney 14.aac",
                        "translate": "Would you care to join me for some fine Indian cuisine?"
                    },
                    {
                        "text": "You’re a right sort – can I ‘av your dog and bone number?",
                        "sound": "assets/sounds/Cockney 15.aac",
                        "translate": "I find you very attractive – could I possibly have your phone number?"
                    },
                    {
                        "text": "I’m Borassic – faancy grabbin’ me a King Lear?",
                        "sound": "assets/sounds/Cockney 16.aac",
                        "translate": "I appear to have misplaced my wallet. Would you be so kind as to buy me a lovely ale?"
                    },
                    {
                        "text": "My old china thinks you’re laaavly…",
                        "sound": "assets/sounds/Cockney 17.aac",
                        "translate": "My good friend over there has expressed his interest in you…"
                    },
                    {
                        "text": "I’m cream crackered – fancy headin’ up the apples and pears for a little bo?",
                        "sound": "assets/sounds/Cockney 18.aac",
                        "translate": "I’m ever so tired – would you like to join me upstairs for a lie down?"
                    },
                    {
                        "text": "Get your weasel – you’ve pulled.",
                        "sound": "assets/sounds/Cockney 19.aac",
                        "translate": "Would you like to grab your coat so we can leave this establishment?"
                    },
                    {
                        "text": "This is a bit Richard – shall we scarper?",
                        "sound": "assets/sounds/Cockney 20.aac",
                        "translate": "I’m not overly fond of this place – can I suggest we head elsewhere?"
                    }
                ],
                []
            ]
        }
    },
    languages = [
        {slug: "es", name: "Spanish"},
        {slug: "de", name: "German"},
        {slug: "fr", name: "French"},
        {slug: "it", name: "Italian"},
        {slug: "en", name: "Cockney"}
    ],
    locations = [
        {slug: "beach", name: "On the beach"},
        {slug: "bar", name: "At the bar"},
        {slug: "pool", name: "By the pool"},
        {slug: "random", name: "Random"}
    ],

    i18n = {
        "en-US": {
            "skip": "Skip",
            "loaded": "loaded",
            "start-game": "Start game",
            "continue-game": "Continue game",
            "quick-phrases": "Quick Phrases",
            "next": "Next",
            "close": "Close",
            "no": "No",
            "yes": "Yes",
            "im-ready": "I&rsquo;m ready",
            "start-again": "Start<br />again",
            "next-line": "Next<br />line",
            "end-game": "End<br />game",
            "next-challenge": "Next<br />challenge",
            "how-to-get-le-girl": "How to get le girl",
            "now-get-le-girl": "Now get le girl&hellip;<br />or a slap in le face.",
            "get-ready-to-say": "Get ready to say your line with the help of some audio",
            "select-her-language": "Select her language and location &mdash;<br />then be brave and keep safe mode off",
            "spotted-a-sexy": "Spotted a sexy senorita?<br />Fire up the app",
            "enter-all-the-lads": "Enter all the lads into a<br />league. Then you&rsquo;re ready",
            "le-girls-language": "Le girl&rsquo;s language",
            "le-girls-location": "Le girl&rsquo;s location",
            "get-le-girl": "Get le girl",
            "safe-mode": "Safe mode",
            "next-up-to-get-le-girl-is": "Next up to<br />get le girl is&hellip;",
            "safe-mode-info": "ON for tried and tested lines. OFF if you&rsquo;re feeling brave.",
            "name-your-league": "Name your league",
            "add-the-lads": "Add the lads",
            "good-luck": "Good luck,",
            "nice-one": "Nice one,",
            "poor-effort": "Poor effort,",
            "get-that-man-a-forfeit": "Get that man a forfeit",
            "bottled": "Bottled",
            "completed": "Completed",
            "point": "point",
            "points": "points",
            "pt": "pt",
            "forfeit": "forfeit",
            "add-another-player": "Add another player",
            "new-challenge": "New Challenge",
            "share": "Share",
            "tweet": "Tweet",
            "wins": "wins",
            "win": "win",
            "its-a-draw": "It's a draw.",
            "keep-players-info": "Would you like to keep the existing player names?",
            "share-to-win": "Share to win",
            "ad-info": "Tell your friends how to Get LE Girl for a chance to win a load of Lynx for you and your mates. You&rsquo;ll probably need it to wash your mouths out."
        }
    },
    app = {
        league: {
            name: "League 1",
            players: [
                {
                    name: "Player 1",
                    score: 0
                },
                {
                    name: "Player 2",
                    score: 0
                }
            ],
            _defaults: {
                name: "League 1",
                players: [
                    {
                        name: "Player 1",
                        score: 0
                    },
                    {
                        name: "Player 2",
                        score: 0
                    }
                ]
            }
        },
        scrolls: {},
        pages: {},
        buttons: {},
        inputs: {},
        lists: {}
    };
/**
 * Localization
 */
(function(){
    var default_local = DEFAULT_LOCAL,
        items = document.querySelectorAll("[data-i18n]"),
        placeholders = document.querySelectorAll("[data-ph-i18n]");

    Array.prototype.forEach.call(items, function(item){
        var key = item.dataset["i18n"];
        if(item.tagName.toLowerCase() === "input"){
            item.value = i18n[default_local][key] || key;
        }else{
            item.innerHTML = i18n[default_local][key] || key;
        }
        if(item.classList.contains("text") && item.innerHTML.length > 61){
            item.classList.add("small");
        }
    });

    Array.prototype.forEach.call(placeholders, function(item){
        var key = item.dataset["phI18n"];
        item.setAttribute("placeholder", i18n[default_local][key] || key);
    });
})();
/**
 * Add events for touches and desktop devices and prevent move page in iphone.
 * Create custom Active state and prevent this active state by adding a data-activatable in your
 * html or data-preventactive also create a fast click by dispatching a custom event
 */
(function(){
    var has = "ontouchstart" in window,
        debugTimer = void(0),
        touches = {
            start: has ? "touchstart": "mousedown",
            touch: has ? "touch": "touch",
            move: has ? "touchmove": "mousemove",
            end: has ? "touchend": "mouseup",
            cancel: has ? "touchcancel": "mouseleave"
        },
        items = document.querySelectorAll("[data-activatable]"),
        prevent = document.querySelectorAll("[data-preventactive]");

    /**
     * function that dispatch custom event for fast click to item
     * @param item {Element}
     */
    function dispatchTouch(item){
        var event = document.createEvent("Event");
        event.initEvent(touches.touch, true, true);
        item.dispatchEvent(event);
    }

    /**
     * function that gets the element offset in page context
     * @param el {Element}
     * @returns {left, top}
     */
    function getElementPageOffset(el){
        var l = 0, t = 0;

        do{
            l += el.offsetLeft;
            t += el.offsetTop;
        }while(el = el.offsetParent);

        return {left:l, top:t};
    }

    /**
     * function that return first activatable parent element
     * @param item {Element}
     * @returns {Element} activatable element
     */
    function getParentActivatable(item){
        do{
            if(item.dataset["activatable"]) return item;
        }while(item = item.parentElement);
    }

    /**
     * Remove custom active state and dispatch fast click event if active item
     * is equal to current event item
     * @param e
     */
    function doEnd(e){
        var active = document.querySelector(".active"),
            //offset = getElementPageOffset(active),
            _item = getParentActivatable(e.target);
        //get parent activatable item and check if is equal to active element
        if(active ===  _item/* && (offset.left === _item.offsetPageLeft && offset.top === _item.offsetPageTop)*/) dispatchTouch(active);
        if(active) active.classList.remove("active");
    }

    /**
     * Add events to all activatable items
     */
    Array.prototype.forEach.call(items, function(item){
        item.addEventListener(touches.start, function(){
            /*var offset = getElementPageOffset(item);
             item.offsetPageLeft = offset.left;
             item.offsetPageTop = offset.top;*/
            item.classList.add("active");
        });
        item.addEventListener(touches.cancel, function(e){
            var active = document.querySelector(".active");
            active.classList.remove("active");
        });
        item.addEventListener(touches.end, function(e){
            doEnd(e);
        });
    });

    /**
     * Add start event and stopPropagation to prevent active
     */
    Array.prototype.forEach.call(prevent, function(item){
        item.addEventListener(touches.start, function(e){
            e.stopPropagation();
        });
    });

    /**
     * Prevent default move event to remove page moving on iphone
     */
    window.addEventListener(touches.move, function(e){
        e.preventDefault();
    });

    app.touches = touches;

})();
/**
 * Switch buttons change
 */
(function(){
    var switch_buttons = document.getElementsByTagName("switch");

    Array.prototype.forEach.call(switch_buttons, function(item){
        var touch = null, start = null, move = 0, end = 0, dir = 0;

        item.addEventListener(app.touches.touch, function(){
            //this.setAttribute("value", this.getAttribute("value") === "0" ? "1" : "0");
        });

        item.addEventListener(app.touches.start, function(e){
            touch = e.changedTouches ? e.changedTouches[e.changedTouches.length-1] : e;
            var down = touch.pageX - this.offsetLeft;
            start = touch.pageX;
            this.classList.add("move");

            if(down <  this.offsetWidth/2 && item.getAttribute("value") === "0" ||
                down >  this.offsetWidth/2 && item.getAttribute("value") === "1"){
                start = null;
            }

        });
        item.addEventListener(app.touches.move, function(e){
            touch = e.changedTouches ? e.changedTouches[e.changedTouches.length-1] : e;
            if(!start) return;
            move =  touch.pageX - start;
            dir = move > 0 ? 1 : 0;
            if(dir != item.getAttribute("value")) return;

            move = Math.abs(move/(this.offsetWidth/2));
            move = move >= 1 ? 1 : move;
            move = move <= 0 ? 0 : move;
            item.style.backgroundPosition = (dir === 0 ? move*100 : 100- move*100)+"% 0";
        });
        item.addEventListener(app.touches.end, function(e){
            touch = e.changedTouches ? e.changedTouches[e.changedTouches.length-1] : e;
            var up = touch.pageX - this.offsetLeft;

            this.removeAttribute("style");
            this.classList.remove("move");
            if(up > this.offsetWidth/2){
                this.setAttribute("value", "0");
            }else{
                this.setAttribute("value", "1");
            }
            start = null;
        });
    });
})();
/**
 * Create scrolls for every element with data-scrollable="true"
 */
(function(){
    var items = document.querySelectorAll("[data-scrollable]");

    Array.prototype.forEach.call(items, function(item){
        var value = eval(item.dataset["scrollable"]);
        if(value){
            item.scroll = new iScroll(item, {
                hideScrollbar: false,
                onRefresh: function(){
                    if(this.scrollerH <= this.wrapperH)
                        this.disable();
                    else
                        this.enable();
                }
            });
        }
    });
})();

(function(){
    var links = document.querySelectorAll("a[target='_system']");

    Array.prototype.forEach.call(links, function(link){
        link.addEventListener(app.touches.touch, function(){
            window.open(this.dataset["href"], "_system");
        });
    });
})();

/**
 * Base show and hide functions
 */
function hide(section, callbacks){
    if(section.classList.contains("fade") || section.classList.contains("appear")){
        return;
    }
    if(callbacks && callbacks.before instanceof Function) callbacks.before();
    section.addEventListener("webkitAnimationEnd", function fn(){
        section.classList.remove("current");
        section.classList.remove("fade");
        if(callbacks && callbacks.after instanceof Function) callbacks.after();
        section.removeEventListener("webkitAnimationEnd", fn);
    });
    section.classList.add("fade");
}
function show(section, callbacks){
    if(section.classList.contains("fade") || section.classList.contains("appear")){
        return;
    }
    if(callbacks && callbacks.before instanceof Function) callbacks.before();
    section.addEventListener("webkitAnimationEnd", function fn(){
        section.classList.remove("appear");
        if(callbacks && callbacks.after instanceof Function) callbacks.after()
        section.removeEventListener("webkitAnimationEnd", fn);
    });
    section.classList.add("current");
    section.classList.add("appear");
}

/**
 * All Methods
 */

function fill_select(select, data){
    var _i = 0, option;
    if(select.children.length > 0) return;
    for(_i; _i < data.length; _i++){
        option = document.createElement("option");
        option.value = data[_i].slug;
        option.innerHTML = data[_i].name;
        select.appendChild(option);
    }

}

function player(){
    var value = 0,
        player = document.getElementById("player"),
        source = player.getElementsByTagName("audio").item(0),
        play_button = document.getElementById("play_button"),
        play_progress = document.getElementById("play_progress"),
        play_progress_indicator = play_progress.getElementsByTagName("div").item(0);


    source.addEventListener("ended", function(){
        play_button.classList.toggle("ic-play");
        play_button.classList.toggle("ic-pause");
    });

    /*source.addEventListener("pause", function(){
        play_button.classList.add("ic-play");
        play_button.classList.remove("ic-pause");
    });*/

    source.addEventListener("timeupdate", function(){
        if(source.currentTime > 0){
            value = (source.currentTime/source.duration)*100;
        }else{
            value = 0;
        }
        play_progress_indicator.style.width = value+"%";
    });

    play_button.addEventListener(app.touches.touch, function(){

        if(source.paused || source.ended){
            source.play();
        }else{
            source.pause();
        }
        play_button.classList.toggle("ic-play");
        play_button.classList.toggle("ic-pause");
    });


    function setSource(data){
        var _i = 0, item;

        source.innerHTML = "";
        if(!(data instanceof Array)) {
            data = [data];
        }
        for(_i; _i < data.length; _i++){
            item = document.createElement("source");
            item.src = data[_i];
            item.type = "audio/mpeg";

            source.appendChild(item);
        }
        source.load();
    }
    var p = {
        play: function(){
            source.play();
        },
        stop: function(){
            source.pause();
            play_button.classList.add("ic-play");
            play_button.classList.remove("ic-pause");
            try{
                source.currentTime = 0;
            }catch (e){

            }
        },
        pause: function(){
            source.pause();
        },
        source: function(data){
            p.stop();
            setTimeout(function(){
                setSource(data);
            },1);
        }
    };
    return p;
}

function cordovaPlayer(){
    var value = 0,
        media = void 0,
        mediaTimer = null,
        player = document.getElementById("player"),
        play_button = document.getElementById("play_button"),
        play_progress = document.getElementById("play_progress"),
        play_progress_indicator = play_progress.getElementsByTagName("div").item(0);

    play_button.addEventListener(app.touches.touch, function(){
        if(play_button.classList.contains("ic-play")){
            media.play();
        }else{
            media.pause();
        }
        play_button.classList.toggle("ic-play");
        play_button.classList.toggle("ic-pause");
    });

    function setMediaTimer(){
        var duration = 0;

        if (mediaTimer != null) return;

        mediaTimer = setInterval(function(){

            duration = media.getDuration();

            media.getCurrentPosition(
                function(currentTime) {
                    if(currentTime > 0){
                        value = (currentTime/duration)*100;
                    }else{
                        value = 0;
                    }
                    play_progress_indicator.style.width = value+"%";
                },
                function(e) {
                    console.log("Error getting pos=" + e);
                }
            );
        }, 100);
    }

    var p = {
        play: function(){
            if(media) media.play();
        },
        stop: function(){
            if(media) media.stop();

            clearInterval(mediaTimer);
            mediaTimer = null;
            play_progress_indicator.style.width = (value = 0)+"%";

            play_button.classList.add("ic-play");
            play_button.classList.remove("ic-pause");
        },
        pause: function(){
            if(media) media.pause();
        },
        source: function(data){
            p.stop();
            media = new Media("/android_asset/www/"+data, function(){
                play_button.classList.add("ic-play");
                play_button.classList.remove("ic-pause");
            }, function(){});
            setMediaTimer();
        }
    };
    return p;
}

function showMenu(){
    var progress = document.getElementById("progress"),
        menu = document.getElementById("menu");

    progress.addEventListener("webkitTransitionEnd", function(){
        progress.classList.add("hidden");
        progress.classList.remove("fade_out");
    });
    progress.classList.add("fade_out");

    menu.classList.add("slide_up");
}

/**
 * New Code
 */
function update_progress(value){
    var progress = document.querySelector("#progress progress"),
        progress_text = document.querySelector("#progress .progress-text span:first-child"),
        progress_bar = document.querySelector("#progress progress div");
    progress.setAttribute("value", value || 0);
    progress_bar.style.width = progress_text.innerHTML = (value || 0) +"%";
}

function loading(fn){
    var count = 0,
        load_int,
        _len = assets.length - 1,
        _i = 0;
    //for(_i; _i <= _len; _i++){
    load_int = setInterval(function(){
        if(_i == _len) clearInterval(load_int);
        (function(i){
            var img = new Image();
            img.onload = function(){
                update_progress(Math.round((count / _len)*100));
                if(++count === _len){
                    fn();
                }
            };
            img.src = assets[i];
        })(_i);
        _i++;
    }, 50);
    //}
}

/**
 * Page Class
 */
Page = (function(){

    function Page(element){
        this.element = element;
        this.preventShow = false;
        this.preventHide = false;
    }

    Page.prototype.beforeHide = function(data){};
    Page.prototype.onHide = function(data){};

    Page.prototype.hide = function(data){
        var _this = this;
        if(this.element.classList.contains("fade") || this.element.classList.contains("appear")){
            return;
        }
        if(this.beforeHide instanceof Function) this.beforeHide(data);
        if(this.preventHide) return;
        this.element.addEventListener("webkitAnimationEnd", function fn(){
            if(_this.onHide instanceof Function) _this.onHide(data);
            _this.element.removeEventListener("webkitAnimationEnd", fn);
            setTimeout(function(){
                _this.element.classList.remove("current");
                _this.element.classList.remove("fade");
            }, 100);
        });
        this.element.classList.add("fade");
    };

    Page.prototype.beforeShow = function(data){};
    Page.prototype.onShow = function(data){};

    Page.prototype.show = function(data){
        var _this = this;
        if(this.element.classList.contains("fade") || this.element.classList.contains("appear")){
            return;
        }
        if(_this.beforeShow instanceof Function) _this.beforeShow(data);
        if(this.preventShow) return;
        this.element.addEventListener("webkitAnimationEnd", function fn(){
            if(_this.onShow instanceof Function) _this.onShow(data);
            _this.element.removeEventListener("webkitAnimationEnd", fn);
            setTimeout(function(){
                _this.element.classList.remove("appear");
            }, 100);
        });
        this.element.classList.add("current");
        this.element.classList.add("appear");
    };

    return Page;
})();

function loadPhrase(language, location, safe){
    var phrase = void(0),
        index = 0,
        texts = getPhrases(language, location, safe);


    index = Math.round(Math.random()*(texts.length-1));
    phrase = texts[index];

    return phrase
}

function setPhrase(phrase){
    var phrase_text = document.getElementById("phrase-text"),
        description_text = document.getElementById("description-text");

    if(phrase.text.length > 64){
        phrase_text.classList.add("small");
    }else{
        phrase_text.classList.remove("small");
    }
    if(phrase.translate.length > 44){
        description_text.classList.add("small");
    }else{
        description_text.classList.remove("small");
    }

    phrase_text.innerHTML = phrase.text;
    description_text.innerHTML = phrase.translate;
    app.player.source(phrase.sound);
}

function getPhrases(language, location, safe){
    var langs = phrases[language],
        lang = [], phrs = [];
    if(location === "random"){
        if(safe){
            for(var loc in langs){
                phrs = phrs.concat(langs[loc][0]);
            }
        } else {
            for(var loc in langs){
                lang = langs[loc][0].concat(langs[loc][1]);
                phrs = phrs.concat(lang);
            }
        }
    }else{
        if(safe){
            ["other","specific", location].forEach(function(loc){
                phrs = phrs.concat(langs[loc][0]);
            });
        } else {
            ["other","specific", location].forEach(function(loc){
                lang = langs[loc][0].concat(langs[loc][1]);
                phrs = phrs.concat(lang);
            });
        }
    }
    return phrs;
}

function leagueFocus(item){
    app.inputs["league_name"].classList.add("muted");
    Array.prototype.forEach.call(document.querySelectorAll("#players-list li input"), function(el){
        el.classList.add("muted");
    });
    item.classList.remove("muted");
}

function leagueBlur(){
    app.inputs["league_name"].classList.remove("muted");
    Array.prototype.forEach.call(document.querySelectorAll("#players-list li input"), function(el){
        el.classList.remove("muted");
    });
}

function createPlayerItem(player, disabled) {
    var input,
        hmtl = '<label class="input" data-score="0">\
                        <input '+(disabled ? 'disabled="true"' : '')+' value=""/>\
                        <div class="button-wrapper small yellow">\
                            <div class="left"></div>\
                            <div class="button">\
                                <div class="inner ic-edit"></div>\
                            </div>\
                            <div class="bottom"></div>\
                        </div>\
                    </label>',
        default_name = app.league._defaults.players[0].name,
        item = document.createElement("li");

    item.innerHTML = hmtl;

    input = item.getElementsByTagName("input").item(0);

    if(!player){
        player = {
            name: default_name.replace(/\s+[0-9]*$/, " "+(app.league.players.length+1)),
            score: 0
        };
        app.league.players.push(player);
    }


    item.getElementsByClassName("input").item(0).dataset["score"] = player.score;
    input.player = player
    input.value = player.name;
    input.addEventListener("focus", function(){
        leagueFocus(input);
    });
    input.addEventListener("blur", function(){
        leagueBlur();
    });
    input.addEventListener("change", function(){
        this.player.name = this.value;
    });

    app.lists["players_list"].appendChild(item);
    app.scrolls["players_list"].refresh();
    app.scrolls["players_list"].scrollToElement(item);
}

function nextTutorial(){
    hide(app.pages["tutorial"].steps.item(app.pages["tutorial"].current));
    show(app.pages["tutorial"].steps.item(++app.pages["tutorial"].current));

    if(app.pages["tutorial"].current === app.pages["tutorial"].steps.length-1) {
        app.buttons["next_tutorial"].classList.add("hidden");
        app.buttons["skip_tutorial"].classList.add("hidden");
        app.buttons["ready_tutorial"].classList.remove("hidden");
    }
}

function createSpinAnimation(tz, deg, min){
    var rule, container, spin, spin_static,
        items = Math.floor((Math.random()*(min*5))+(min*2)),
        deg = items * deg,
        spinner = document.getElementsByTagName("spinner").item(0),
        lastSheet = document.styleSheets[document.styleSheets.length - 1];

    rule = "@-webkit-keyframes spin {\
                        0% {\
                            -webkit-transform: translateZ(-"+ tz +"px) rotateX(0deg);\
                        }\
                        100% {\
                            -webkit-transform: translateZ(-"+ tz +"px) rotateX(-"+ deg +"deg);\
                        }\
                    }";
    lastSheet.insertRule(rule, lastSheet.cssRules.length);

    spin = ".spinner-wrapper .container spinner.spin {\
                    -webkit-animation: spin "+ 100*items +"ms cubic-bezier(.25, 0, .55, 1);\
                    -webkit-transform: translateZ(-"+ tz +"px) rotateX(-"+ deg +"deg);\
               }";
    lastSheet.insertRule(spin, lastSheet.cssRules.length);
    spin_static = ".spinner-wrapper .container spinner {\
                    -webkit-transform: translateZ(-"+ tz +"px) rotateX(0deg);\
                }";
    lastSheet.insertRule(spin_static, lastSheet.cssRules.length);

    container = ".spinner-wrapper .container {\
                    -webkit-perspective: "+ (1000* (1/(min-5)))+"px;\
               }";
    lastSheet.insertRule(container, lastSheet.cssRules.length);

    spinner.classList.add("spin");

    return items;
}

function removeSpinRules(){
    var lastSheet = document.styleSheets[document.styleSheets.length - 1];

    lastSheet.deleteRule(lastSheet.cssRules.length - 3);
    lastSheet.deleteRule(lastSheet.cssRules.length - 3);
}

function prepareSpinner(players){
    var _i = 0, _len = players.length,
        spinner = document.getElementsByTagName("spinner").item(0),
        item, deg, tz, items;

    if(_len < 6){
        var d = 6/_len;
        if(d > 1) _len *= Math.ceil(d);
    }

    deg = 360/_len;
    tz = Math.round((spinner.offsetHeight/2)/Math.tan(Math.PI/_len));

    if(!spinner.innerHTML)
        for(_i; _i < _len; _i++){
            item = document.createElement("item");
            item.style["-webkit-transform"] = "rotateX("+_i*deg+"deg) translateZ("+tz+"px)";
            item.innerHTML = "<span>"+players[_i%players.length].name+"</span>";
            spinner.appendChild(item);
        }

    items = createSpinAnimation(tz, deg, _len);

    return players[items%players.length];
}

function spinnerCallback(){
    app.pages["spin"].onready(app.pages["spin"].winner);
    this.removeEventListener("webkitAnimationEnd", spinnerCallback);
}

function sortPlayers(data, players_score){
    var _i = 0,
        players = app.league.players.slice(0);

    players.sort(function(x, y){
        if(x.score === y.score){
            return x.name - y.name;
        }
        return y.score - x.score;
    });
    players_score.innerHTML = "";
    for(_i; _i < players.length; _i++){
        createPlayerScoreItem.call(data, players[_i], players_score);
    }
    return players;
}

function createPlayerScoreItem(player, players_score){
    var item, point,
        html = '<div class="name">\
                        <strong></strong><span></span>\
                    </div>';
    item = document.createElement("li");
    item.innerHTML = html;

    item.getElementsByTagName("strong").item(0).innerHTML = player.name;
    point = item.getElementsByTagName("span").item(0);
    if(this.player && player === this.player){
        item.getElementsByTagName("div").item(0).dataset["score"] = player.score - this.point;
        if(this.point !== 0){
            point.dataset["point"] = "+"+this.point;
            point.innerHTML = i18n[DEFAULT_LOCAL].pt;
        }else{
            point.innerHTML = i18n[DEFAULT_LOCAL].forfeit;
        }
        setTimeout(function(){
            point.addEventListener("webkitAnimationEnd", function bounce(){
                point.classList.add("visible");
                setTimeout(function(){
                    point.addEventListener("webkitAnimationEnd", function fade(){
                        item.getElementsByTagName("div").item(0).dataset["score"] = player.score;
                        point.removeEventListener("webkitAnimationEnd", fade);
                    });
                    point.classList.add("fade");
                    point.classList.remove("visible");

                }, 1000);
                this.removeEventListener("webkitAnimationEnd", bounce);
            });
            point.classList.add("bounce");

        }, 200);
    }else{
        item.getElementsByTagName("div").item(0).dataset["score"] = player.score;
        point.parentNode.removeChild(point);
    }
    players_score.appendChild(item);
    app.scrolls["players_score"].refresh();
}

function checkScrollShadows(){
    if(this.wrapperH < this.scrollerH){
        if(this.y >= 0){
            this.wrapper.classList.add("scroll-top");
            this.wrapper.classList.remove("scroll-bottom");
        }
        if(this.y < 0 && this.y > this.maxScrollY){
            this.wrapper.classList.add("scroll-bottom");
            this.wrapper.classList.add("scroll-top");
        }
        if(this.y <= this.maxScrollY){
            this.wrapper.classList.remove("scroll-top");
            this.wrapper.classList.add("scroll-bottom");
        }
    }else{
        this.wrapper.classList.remove("scroll-top");
        this.wrapper.classList.remove("scroll-bottom");
    }
}

/**
 * Create Buttons
 */
function createButtons(){
    app.buttons["start_game"] = document.getElementById("start_button");
    app.buttons["quick_phrases"] = document.getElementById("quick_start_button");
    app.buttons["home"] = document.querySelectorAll("header .home-button");
    app.buttons["logo"] = document.querySelectorAll("header .logo-button");
    app.buttons["play"] = document.getElementById("play");
    app.buttons["add_player"] = document.getElementById("add-player");
    app.buttons["safe_mode"] = document.getElementById("safe_mode_button");
    app.buttons["next_tutorial"] = document.getElementById("next_tutorial");
    app.buttons["skip_tutorial"] = document.getElementById("skip_tutorial");
    app.buttons["ready_tutorial"] = document.getElementById("ready_tutorial");
    app.buttons["get_le_girl"] = document.getElementById("get_le_girl");
    app.buttons["close_safe_mode"] = document.getElementById("close_safe_mode");
    app.buttons["start_again"] = document.getElementById("start_again");
    app.buttons["next_line"] = document.getElementById("next_line");
    app.buttons["bottled"] = document.getElementById("bottled_buttons");
    app.buttons["completed"] = document.getElementById("completed_button");
    app.buttons["end_game"] = document.getElementById("end_game_button");
    app.buttons["next_challenge"] = document.getElementById("next_challenge_button");
    app.buttons["new_challenge"] = document.getElementById("new_challenge_button");
    app.buttons["clear_players"] = document.getElementById("clear_players_button");
    app.buttons["keep_players"] = document.getElementById("keep_players_button");
}

/**
 * Create Inputs
 */
function createInputs(){
    app.inputs["league_name"] = document.getElementById("league-name");
    app.inputs["languages"] = document.getElementById("languages");
    app.inputs["locations"] = document.getElementById("locations");
}

/**
 * Create Scrolls
 */
function createScrolls(){
    app.scrolls["players_list"] = new iScroll(document.getElementById("players_list_scroll"), {
        onBeforeScrollStart: function(e){
            e.stopPropagation();
        },
        onRefresh: function(){
            checkScrollShadows.call(this);
        },
        onScrollEnd: function(){
            checkScrollShadows.call(this);
        },
        onScrollMove: function(){
            checkScrollShadows.call(this);
        }
    });
    app.scrolls["players_score"] = new iScroll(document.getElementById("players_score_scroll"), {
        onBeforeScrollStart: function(e){
            e.stopPropagation();
        },
        onRefresh: function(){
            checkScrollShadows.call(this);
        },
        onScrollEnd: function(){
            checkScrollShadows.call(this);
        },
        onScrollMove: function(){
            checkScrollShadows.call(this);
        }
    });
    app.scrolls["win_players_score"] = new iScroll(document.getElementById("win_players_score_scroll"), {
        onBeforeScrollStart: function(e){
            e.stopPropagation();
        },
        onRefresh: function(){
            checkScrollShadows.call(this);
        },
        onScrollEnd: function(){
            checkScrollShadows.call(this);
        },
        onScrollMove: function(){
            checkScrollShadows.call(this);
        }
    });
}

/**
 * Create Pages
 */
function createHomePage(){
    app.pages["home"] = new Page(document.getElementById("home"));
    app.pages["home"].beforeShow = function(){
        app.current = this;
        var text = app.buttons["start_game"].querySelector("[data-i18n]");
        if(app.game_started){
            text.innerHTML = i18n[DEFAULT_LOCAL]['continue-game'];
        }else{
            text.innerHTML = i18n[DEFAULT_LOCAL]['start-game'];
        }
    };
}

function createLeaguePage(){
    app.pages["league"] = new Page(document.getElementById("league-info"));
    app.pages["league"].beforeShow = function(){
        app.current = this;
        app.inputs["league_name"].value = app.league.name;
        app.lists["players_list"].innerHTML = "";
        for(var _i = 0; _i < app.league.players.length; _i++){
            createPlayerItem(app.league.players[_i], true);
        }
    };
    app.pages["league"].onShow = function(){
        app.scrolls["players_list"].refresh();
        this.element.querySelector("[data-scrollable=true]").scroll.refresh();
        Array.prototype.forEach.call(app.lists["players_list"].getElementsByTagName("input"), function(input){
            input.disabled = false;
        });
    };
    app.pages["league"].onHide = function(){
        Array.prototype.forEach.call(app.lists["players_list"].getElementsByTagName("input"), function(input){
            input.disabled = true;
        });
    };
}

function createGirlInfoPage(){
    app.pages["girl"] = new Page(document.getElementById("girl-info"));
    app.pages["girl"].beforeShow = function(data){
        app.current = this;
        document.getElementById("safe-mode").setAttribute("value", app.safe ? 1 : 0);

        if(app.language){
            app.inputs["languages"].value = app.language;
        }else{
            app.inputs["languages"].selectedIndex = 0;
        }

        if(app.location) {
            app.inputs["locations"].value = app.location;
        }else{
            app.inputs["locations"].selectedIndex = 0;
            app.inputs["locations"].disabled = false;
        }

        hideFields(app.inputs["languages"].value);

        this.data = data;
        if(data){
            this.players = data;
        }
        if(data){
            app.game_started = true;
        }
    };
    app.pages["girl"].onShow = function(){
        this.element.querySelector("[data-scrollable=true]").scroll.refresh();
    };
}

function createChallengePage(){
    app.pages["challenge"] = new Page(document.getElementById("challenge"));
    app.pages["challenge"].beforeShow = function(data){
        var player_name_holder = document.getElementById("player_name_holder"),
            player_name = document.getElementById("player_name"),
            spinner = document.getElementsByTagName("spinner").item(0),
            quick_buttons = document.getElementById("quick_buttons"),
            assessment_buttons = document.getElementById("assessment_buttons");

        app.current = this;
        this.phrase = void 0;
        if(data.player){
            this._language = data.language;
            this._location = data.location;
            this._safe = data.safe;
            this._player = data.player;
            if(!this._phrase){
                this._phrase = this.phrase = loadPhrase(this.language = data.language, this.location = data.location, this.safe = data.safe);
            }
        }else{
            this.phrase = loadPhrase(this.language = data.language, this.location = data.location, this.safe = data.safe);
        }

        setPhrase(this.phrase || this._phrase);

        if(this.player = data.player){
            quick_buttons.classList.add("hidden");
            player_name.innerHTML = this.player.name;
            if(this.player.name.length > 17){
                player_name.classList.add("ellipsis");
            }else{
                player_name.classList.remove("ellipsis");
            }
            player_name_holder.classList.remove("hidden");
            assessment_buttons.classList.remove("hidden");
        }else{
            quick_buttons.classList.remove("hidden");
            player_name_holder.classList.add("hidden");
            assessment_buttons.classList.add("hidden");
        }
    };
    app.pages["challenge"].beforeHide = function(remove_phrase){
        app.player.stop();
        if(remove_phrase) this._phrase = void 0;
    };
    app.pages["challenge"].onShow = function(){
        this.element.querySelector("[data-scrollable=true]").scroll.refresh();
    };
}

function createSpinPage(){
    app.pages["spin"] = new Page(document.getElementById("spin"));
    app.pages["spin"].beforeShow = function(fn){
        var spinner = document.getElementsByTagName("spinner").item(0);
        app.current = this;
        this.winner = null;
        this.onready = fn;
        spinner.removeEventListener("webkitAnimationEnd", spinnerCallback);
        spinner.addEventListener("webkitAnimationEnd", spinnerCallback);
    };
    app.pages["spin"].onShow = function(){
        this.winner = prepareSpinner(app.league.players);
    };
    app.pages["spin"].onHide = function(){
        var spinner = document.getElementsByTagName("spinner").item(0);
        spinner.classList.remove("spin");
        removeSpinRules();
    };
}

function createScorePage(){
    app.pages["score"] = new Page(document.getElementById("score"));
    app.pages["score"].beforeShow = function(data){
        var score_player_name = document.getElementById("score_player_name"),
            nice_one = document.getElementById("nice-one"),
            poor_effort = document.getElementById("poor-effort"),
            title_no_points = document.getElementById("title-no-points"),
            title_points = document.getElementById("title-points"),
            league_name = document.getElementById("league_name");

        app.current = this;

        league_name.innerHTML = app.league.name;
        if(data) {
            data.player.score += data.point;

            this.players = sortPlayers(data, document.getElementById("players-score"));

            if(data.point !== 0){
                nice_one.classList.remove("hidden");
                poor_effort.classList.add("hidden");
                title_no_points.classList.add("hidden");
                title_points.classList.remove("hidden");
                title_points.dataset["point"] = data.point;
                title_points.innerText = i18n[DEFAULT_LOCAL][data.point > 1 ? 'points' : 'point'];
            }else{
                nice_one.classList.add("hidden");
                poor_effort.classList.remove("hidden");
                title_no_points.classList.remove("hidden");
                title_points.classList.add("hidden");
            }
            score_player_name.innerHTML = data.player.name;
            if(data.player.name.length > 17){
                score_player_name.classList.add("ellipsis");
            }else{
                score_player_name.classList.remove("ellipsis");
            }
        }
    };
    app.pages["score"].onShow = function(data){
        if(!data) return;
        var index = this.players.indexOf(data.player),
            li = document.querySelector("#players-score li:nth-child("+Math.max(index-1, 1)+")");
        app.scrolls["players_score"].refresh();
        if(this.players.length > 4) app.scrolls["players_score"].scrollToElement(li);
        this.element.querySelector("[data-scrollable=true]").scroll.refresh();
    };
}

function createWinnerPage(){
    app.pages["winner"] = new Page(document.getElementById("winner"));
    app.pages["winner"].beforeShow = function(){
        var def_winner = void 0,
            winners_names = [],
            winner_name = document.getElementById("winner-name"),
            league_name = document.getElementById("win_league_name");

        app.current = this;

        league_name.innerHTML = app.league.name;

        this.players = sortPlayers(app.league.players, document.getElementById("win-players-score"));

        def_winner = this.players[0];
        winners_names.push(def_winner.name);

        for(var i = 1; i < this.players.length; i++){
            if(def_winner.score == this.players[i].score){
                winners_names.push(this.players[i].name);
            }else{
                break;
            }
        }

        if(winner_name.innerHTML.length > 16){
            winner_name.classList.add("ellipsis");
        }else{
            winner_name.classList.remove("ellipsis");
        }
        if(winners_names.length > 1) {
            winner_name.innerHTML = "";
            document.querySelector('[data-i18n="wins"]').innerHTML = i18n[DEFAULT_LOCAL]["its-a-draw"];
        }else{
            winner_name.innerHTML = def_winner.name;
            document.querySelector('[data-i18n="wins"]').innerHTML = i18n[DEFAULT_LOCAL]["wins"];
        }
    };
    app.pages["winner"].onShow = function(){
        app.scrolls["win_players_score"].refresh();
        this.element.querySelector("[data-scrollable=true]").scroll.refresh();
    };
}

function createTutorialPage(){
    app.pages["tutorial"] = new Page(document.getElementById("tutorial"));
    app.pages["tutorial"].onHide = function(){
        localStorage.setItem("skip_tutorial", true);
    };
    app.pages["tutorial"].beforeShow = function(){
        this.skip = localStorage.getItem("skip_tutorial");
        this.current = 0;
        this.steps = this.element.getElementsByTagName("li");

        if(this.skip) {
            return this.preventShow = true;
        }

        this.steps.item(this.current).classList.add("current");
    };
}

function createAdvertisePage(){
    app.pages["advertise"] = new Page(document.getElementById("advertise"));
    app.pages["advertise"].beforeShow = function(){
        app.current = this;
    };
}

function createNewChallengePage(){
    app.pages["new-challenge"] = new Page(document.getElementById("new-challenge"));
    app.pages["new-challenge"].beforeShow = function(keep){
        app.game_started = false;
    };
    app.pages["new-challenge"].beforeHide = function(keep){
        var spinner = document.getElementsByTagName("spinner").item(0);
        spinner.innerHTML = "";
        if(keep === false){
            app.league.name = app.league._defaults.name;
            app.league.players.length = 0;
            app.league._defaults.players.forEach(function(player){
                app.league.players.push(Object.create(player));
            });

        }
    };
}

function createPages(){
    createHomePage();
    createLeaguePage();
    createGirlInfoPage();
    createChallengePage();
    createSpinPage();
    createScorePage();
    createWinnerPage();
    createTutorialPage();
    createAdvertisePage();
    createNewChallengePage();
    app.pages["safe-mode-info"] = new Page(document.getElementById("safe-mode-info"));
}

/**
 * Attach events
 */
function attacheEvents(){
    headerEvents();
    inputEvents();
    buttonEvents();
}

function headerEvents(){
    /**
     * Add Touch events on every home and logo buttons because we have title bar for every page
     */
    Array.prototype.forEach.call(app.buttons["home"], function(item){
        item.addEventListener(app.touches.touch, function(){
            if(app.current.element.classList.contains("appear") || app.current.element.classList.contains("fade")) return;
            if(app.current === app.pages['advertise']){
                app.current.hide();
            }else{
                if(!app.last_page){
                    (app.last_page = app.current).hide();
                }else{
                    app.current.hide();
                }
            }
            app.pages["home"].show();
        });
    });
    Array.prototype.forEach.call(app.buttons["logo"], function(item){
        item.addEventListener(app.touches.touch, function(){
            if(app.current.element.classList.contains("appear") || app.current.element.classList.contains("fade")) return;
            if(!app.last_page){
                (app.last_page = app.current).hide();
            }else{
                app.current.hide();
            }
            app.pages["advertise"].show();
        });
    });
}

function homeButtons(){
    app.buttons["start_game"].addEventListener(app.touches.touch, function(){
        if(app.pages["home"].element.classList.contains("appear") || app.pages["home"].element.classList.contains("fade")) return;
        app.current.hide();
        if(app.game_started){
            if(app.last_page === app.pages["girl"]){
                app.last_page.show(app.pages["girl"].players);
            }
            if(app.last_page === app.pages["spin"]){
                app.last_page.show(function(winner){
                    setTimeout(function(){
                        app.current.hide();
                        app.pages["challenge"].show({language: app.language, location: app.location, safe: app.safe, player: (app.current_winner = winner)});
                    }, 400);
                });
            }
            if(app.last_page === app.pages["challenge"]){
                app.last_page.show({
                    language: app.pages["challenge"]._language,
                    location: app.pages["challenge"]._location,
                    safe: app.pages["challenge"]._safe,
                    player: app.pages["challenge"]._player
                });
            }
            if(app.last_page === app.pages["score"]){
                app.pages["score"].show();
            }
            if(app.last_page === app.pages["winner"]){
                app.pages["winner"].show();
            }
            app.last_page = void 0;
        }else{
            app.pages["league"].show();
        }
    });
    app.buttons["quick_phrases"].addEventListener(app.touches.touch, function(){
        if(app.pages["home"].element.classList.contains("appear") || app.pages["home"].element.classList.contains("fade")) return;
        app.current.hide();
        app.pages["girl"].show();
    });
}

function tutorialButtons(){
    app.buttons["next_tutorial"].addEventListener(app.touches.touch, nextTutorial);
    app.buttons["skip_tutorial"].addEventListener(app.touches.touch, function(){
        app.pages["tutorial"].hide();
    });
    app.buttons["ready_tutorial"].addEventListener(app.touches.touch, function(){
        app.pages["tutorial"].hide();
    });
}

function saveModeButtons(){
    app.buttons["safe_mode"].addEventListener(app.touches.touch, function(){
        app.pages["safe-mode-info"].show();
    });
    app.buttons["close_safe_mode"].addEventListener(app.touches.touch, function(){
        app.pages["safe-mode-info"].hide();
    });
}

function leagueButtons(){
    app.buttons["add_player"].addEventListener(app.touches.touch, function(){
        createPlayerItem(void 0, false);
    });
    app.buttons["play"].addEventListener(app.touches.touch, function callback(){
        if(app.pages["girl"].element.classList.contains("appear") || app.pages["girl"].element.classList.contains("fade")) return;
        app.current.hide();
        app.pages["girl"].show(app.league.players);
    });
}

function challengeButtons(){
    app.buttons["start_again"].addEventListener(app.touches.touch, function(){
        if(app.pages["challenge"].element.classList.contains("appear") || app.pages["challenge"].element.classList.contains("fade")) return;
        app.current.hide();
        app.pages["girl"].show();
    });
    app.buttons["next_line"].addEventListener(app.touches.touch, function(){
        var phrase = loadPhrase(app.pages["challenge"].language, app.pages["challenge"].location, app.pages["challenge"].safe);
        setPhrase(phrase);
    });

    app.buttons["bottled"].addEventListener(app.touches.touch, function(){
        if(app.pages["challenge"].element.classList.contains("appear") || app.pages["challenge"].element.classList.contains("fade")) return;
        app.current.hide(true);
        app.pages["score"].show({player: app.pages["challenge"].player, point: 0});
    });
    app.buttons["completed"].addEventListener(app.touches.touch, function(){
        if(app.pages["challenge"].element.classList.contains("appear") || app.pages["challenge"].element.classList.contains("fade")) return;
        app.current.hide(true);
        app.pages["score"].show({player: app.pages["challenge"].player, point: app.safe ? 1 : 2});
    });
}

function scoreButtons(){
    app.buttons["next_challenge"].addEventListener(app.touches.touch, function(){
        if(app.pages["score"].element.classList.contains("appear") || app.pages["score"].element.classList.contains("fade")) return;
        app.current.hide();
        app.pages["girl"].show(app.league.players);
    });
    app.buttons["end_game"].addEventListener(app.touches.touch, function(){
        if(app.pages["score"].element.classList.contains("appear") || app.pages["score"].element.classList.contains("fade")) return;
        app.current.hide();
        app.pages["winner"].show();
    });
}

function winnerButtons(){
    app.buttons["new_challenge"].addEventListener(app.touches.touch, function(){
        if(app.pages["winner"].element.classList.contains("appear") || app.pages["winner"].element.classList.contains("fade")) return;
        app.pages["new-challenge"].show();
        app.location = void 0;
        app.language = void 0;
        app.safe = false;
    });
    app.buttons["clear_players"].addEventListener(app.touches.touch, function(){
        app.pages["new-challenge"].hide(false);
        app.current.hide();
        app.pages["league"].show();
    });
    app.buttons["keep_players"].addEventListener(app.touches.touch, function(){
        app.pages["new-challenge"].hide(true);
        app.current.hide();
        app.pages["league"].show();
    });
}

function buttonEvents(){
    homeButtons();
    tutorialButtons();
    saveModeButtons();
    leagueButtons();

    app.buttons["get_le_girl"].addEventListener(app.touches.touch, function(){
        if(app.pages["girl"].element.classList.contains("appear") || app.pages["girl"].element.classList.contains("fade")) return;
        app.language = app.inputs["languages"].options[app.inputs["languages"].selectedIndex].value;
        app.location = app.inputs["locations"].options[app.inputs["locations"].selectedIndex].value;
        app.safe = document.getElementById("safe-mode").getAttribute("value") === "0"? false : true;
        app.current.hide();
        if(app.pages["girl"].data){
            app.pages["spin"].show(function(winner){
                setTimeout(function(){
                    app.current.hide();
                    app.pages["challenge"].show({language: app.language, location: app.location, safe: app.safe, player: (app.current_winner = winner)});
                }, 400);
            });
        }else{
            app.pages["challenge"].show({language: app.language, location: app.location, safe: app.safe});
        }
    });

    challengeButtons();
    scoreButtons();
    winnerButtons();
}

function inputEvents(){
    app.inputs["league_name"].addEventListener("change", function(){
        app.league.name = this.value;
    });
    app.inputs["league_name"].addEventListener("focus", function(){
        leagueFocus(app.inputs["league_name"]);
    });
    app.inputs["league_name"].addEventListener("blur", function(){
        leagueBlur();
    });
    app.inputs["languages"].addEventListener("focus", function(){
        app.inputs["languages"].classList.remove("muted");
        app.inputs["locations"].classList.add("muted");
    });
    app.inputs["languages"].addEventListener("blur", function(){
        app.inputs["locations"].classList.remove("muted");
    });
    app.inputs["locations"].addEventListener("focus", function(){
        app.inputs["locations"].classList.remove("muted");
        app.inputs["languages"].classList.add("muted");
    });
    app.inputs["locations"].addEventListener("blur", function(){
        app.inputs["languages"].classList.remove("muted");
    });
    app.inputs["languages"].addEventListener("change", function(){
        hideFields(this.value);
    });
}

function hideFields(value){
    var btn_w = app.inputs["locations"].nextElementSibling,
        safe_w = document.getElementById("safe-holder");
    if(value === "en"){
        app.inputs["locations"].selectedIndex = locations.length-1;
        app.inputs["locations"].disabled = true;
        document.getElementById("safe-mode").setAttribute("value", 0);
        safe_w.classList.add("invisible");
        btn_w.classList.remove("yellow");
        btn_w.classList.add("gray");
    }else{
        app.inputs["locations"].selectedIndex = 0;
        app.inputs["locations"].disabled = false;
        safe_w.classList.remove("invisible");
        btn_w.classList.add("yellow");
        btn_w.classList.remove("gray");
    }
}

/**
 * On assets load
 */
function start(){
    loading(function(){
        setTimeout(function(){
            app.current = void(0);
            app.last_page = void(0);
            app.current_winner = void(0);
            app.language = void(0);
            app.location = void(0);
            app.game_started = false;

            createScrolls();

            createButtons();

            createInputs();

            app.lists["players_list"] = document.getElementById("players-list");

            createPages();

            //Make home current on application start
            app.current = app.pages["home"];
            showMenu();
            app.pages["tutorial"].show();

            try{
                if(PhoneGap){
                    app.player = cordovaPlayer();
                }else{
                    app.player = player();
                }
            }catch(e){
                app.player = player();
            }

            fill_select(app.inputs["languages"], languages);
            fill_select(app.inputs["locations"], locations);

            //Add Buttons Touch Events
            attacheEvents();

        }, 400);
    });
}

try{
    PhoneGap;
}catch(e){
    start();
}

document.addEventListener("deviceready", function(){
    start();
}, false);

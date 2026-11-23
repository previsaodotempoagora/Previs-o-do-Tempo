import { BlogArticle } from './blogTypes';

export const STATE_ARTICLES_PART_1: BlogArticle[] = [
  {
    slug: 'clima-sao-paulo-como-se-prevenir',
    title: 'Clima em São Paulo (SP): Estações, Tempestades, Tempo Seco e Como se Prevenir',
    metaTitle: 'Clima em São Paulo (SP): Guia Completo e Como se Prevenir | Previsão do Tempo Agora',
    metaDescription:
      'Entenda o clima do estado de São Paulo: chuvas de verão, alagamentos, inverno seco e mudanças bruscas de temperatura. Guia prático de prevenção e proteção.',
    keywords: [
      'clima em são paulo',
      'previsão do tempo são paulo prevenção',
      'como se proteger de alagamentos sp',
      'tempo seco são paulo cuidados',
      'frente fria são paulo'
    ],
    category: 'Guias por Estado',
    region: 'Sudeste',
    stateCode: 'SP',
    stateName: 'São Paulo',
    relatedCityId: 'sp-sao-paulo',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-12',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'De tardes quentes seguidas por temporais intensos no verão até manhãs geladas e tardes secas no inverno, o território paulista exige atenção redobrada à previsão diária. Veja como proteger sua saúde, sua casa e seus deslocamentos em cada época do ano.',
    keyTakeaways: [
      'Entre dezembro e março concentram-se os temporais convectivos com risco de enxurradas, queda de árvores e descargas elétricas.',
      'Entre junho e setembro, o interior e a capital enfrentam baixa umidade relativa do ar, muitas vezes abaixo de 30%.',
      'A amplitude térmica no Planalto Paulista pede vestimenta em camadas para evitar choques térmicos ao longo do dia.'
    ],
    sections: [
      {
        id: 'panorama-climatico-sp',
        heading: 'Como funciona o clima no estado de São Paulo',
        paragraphs: [
          'Quem mora ou viaja pelo estado de São Paulo conhece bem a sensação de experimentar duas ou três estações diferentes dentro do mesmo dia. Essa dinâmica acontece porque o território paulista fica em uma zona de transição entre os climas tropicais do Brasil Central e os sistemas subtropicais que avançam pelo Sul do país, além de contar com relevos variados que vão do nível do mar, na Baixada Santista e Litoral Norte, até áreas acima de 1.500 metros na Serra da Mantiqueira.',
          'Na Região Metropolitana de São Paulo e em cidades do planalto como Campinas, Jundiaí e Sorocaba, o clima predominante é o tropical de altitude. Os verões são quentes e bastante úmidos, favorecendo a formação rápida de nuvens carregadas no fim da tarde após horas de calor intenso. Já no interior oeste — abrangendo municípios como Ribeirão Preto, São José do Rio Preto, Bauru e Presidente Prudente —, as temperaturas máximas tendem a ser mais elevadas durante todo o ano, com estação seca muito bem definida entre o outono e o inverno.',
          'No litoral paulista, de Peruíbe a Ubatuba, a presença constante do Oceano Atlântico mantém a umidade elevada e ameniza grandes quedas de temperatura, mas também intensifica o volume de chuvas quando frentes frias ficam estacionadas contra a Serra do Mar.'
        ]
      },
      {
        id: 'verao-temporais-sp',
        heading: 'Verão paulista: prevenção contra temporais, raios e alagamentos',
        paragraphs: [
          'Entre novembro e março, a combinação de calor elevado, alta umidade amazônica e a passagem de frentes frias cria condições frequentes para tempestades severas. Em grandes centros urbanos como a capital, Campinas e o ABC Paulista, a alta impermeabilização do solo faz com que volumes de chuva acima de 30 milímetros em uma hora já gerem pontos críticos de alagamento e enxurradas em avenidas de fundo de vale.',
          'A prevenção começa horas antes das primeiras gotas. Acompanhar o índice de probabilidade de chuva hora a hora permite ajustar horários de retorno do trabalho ou evitar regiões historicamente alagáveis. Quando nuvens escuras se formarem rapidamente ou o vento mudar de direção com rajadas repentinas, procure abrigo em edificações sólidas e nunca enfrente vias com água cobrindo o meio-fio.'
        ],
        checklistTitle: 'Medidas essenciais para períodos de chuva forte em SP',
        checklist: [
          'Limpe calhas, ralos de quintal e grelhas antes do início da tarde nos meses chuvosos para evitar retorno de água.',
          'Jamais tente atravessar ruas alagadas a pé ou de carro; água acima da metade da roda pode fazer o veículo perder tração e estabilidade.',
          'Retire aparelhos eletrônicos sensíveis da tomada durante trovoadas intensas e evite áreas abertas ou proximidade de árvores isoladas.',
          'Moradores de encostas na Serra do Mar ou áreas de risco devem observar sinais de trincas, inclinação de postes e água barrenta escorrendo pelo terreno.'
        ],
        practicalTip:
          'Se estiver no trânsito durante um temporal súbito e a visibilidade cair drasticamente, reduza a velocidade gradualmente, ligue o farol baixo e pare apenas em locais altos e seguros — nunca embaixo de árvores antigas ou passarelas metálicas precárias.'
      },
      {
        id: 'inverno-seco-amplitude',
        heading: 'Outono e inverno: como lidar com o ar seco e a inversão térmica',
        paragraphs: [
          'Com a chegada dos meses mais frios, entre maio e setembro, massas de ar seco ganham força sobre o Centro-Sul do país. Em cidades do interior como Ribeirão Preto e Franca, não é raro passar semanas seguidas sem chuva expressiva, com a umidade relativa do ar caindo para a faixa entre 20% e 28% durante as tardes.',
          'Na Grande São Paulo e nos vales industriais, o frio matinal favorece a inversão térmica — fenômeno em que uma camada de ar frio fica retida próxima ao solo sob uma camada de ar mais quente, dificultando a dispersão de poluentes e partículas finas. O resultado direto é o aumento de irritações nas vias aéreas, ressecamento ocular e crises de rinite ou asma.'
        ],
        checklistTitle: 'Proteção para a saúde nos meses secos e frios',
        checklist: [
          'Hidrate-se de forma contínua ao longo do dia, mesmo quando não sentir sede intensa pelo clima ameno.',
          'Use soro fisiológico para higienização nasal pela manhã e antes de dormir, especialmente em crianças e idosos.',
          'Prefira fazer exercícios ao ar livre antes das 10h ou após as 17h, evitando o pico de ar seco e radiação solar da tarde.',
          'Mantenha janelas abertas nos horários mais ensolarados para renovar o ar e evitar proliferação de ácaros e mofo em armários fechados.'
        ]
      },
      {
        id: 'rotina-e-viagens-sp',
        heading: 'Planejamento inteligente para o dia a dia e viagens pelo estado',
        paragraphs: [
          'Um hábito simples que transforma a rotina em São Paulo é verificar não apenas a temperatura máxima prevista, mas a variação hora a hora e a sensação térmica. Um dia que amanhece a 13 °C pode alcançar 26 °C à tarde e voltar a cair bruscamente à noite caso uma frente fria avance pelo litoral.',
          'Para quem pega estradas rumo ao litoral (Anchieta-Imigrantes, Tamoios ou Oswaldo Cruz) ou sobe a Serra da Mantiqueira rumo a Campos do Jordão, a neblina intensa entre o fim da madrugada e o início da manhã reduz drasticamente o campo de visão. Planejar deslocamentos em janelas de menor nevoeiro e manter faróis auxiliares revisados torna a viagem muito mais tranquila.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Quais são os meses que mais chovem no estado de São Paulo?',
        answer:
          'O período mais chuvoso vai de dezembro a março, com destaque para janeiro e fevereiro, quando tempestades de verão podem gerar grandes volumes de chuva em poucos minutos.'
      },
      {
        question: 'Por que faz tanto calor à tarde e frio de manhã em São Paulo?',
        answer:
          'Durante o outono e o inverno, o céu com poucas nuvens permite que o solo perca calor rapidamente durante a madrugada e se aqueça com facilidade sob o sol da tarde, gerando alta amplitude térmica.'
      },
      {
        question: 'Quando a umidade do ar em São Paulo exige estado de atenção?',
        answer:
          'Segundo critérios da Defesa Civil, umidade relativa entre 21% e 30% coloca a região em estado de atenção; abaixo de 20% configura estado de alerta, exigindo hidratação reforçada e redução de esforço físico intenso.'
      }
    ]
  },
  {
    slug: 'clima-rio-de-janeiro-como-se-prevenir',
    title: 'Clima no Rio de Janeiro (RJ): Calor Intenso, Chuvas de Serra e Como se Proteger',
    metaTitle: 'Clima no Rio de Janeiro (RJ): Prevenção contra Calor e Temporais | Previsão Agora',
    metaDescription:
      'Saiba como funciona o clima no Rio de Janeiro (capital, Baixada, Região dos Lagos e Serrana) e veja cuidados essenciais contra calor extremo e chuvas fortes.',
    keywords: [
      'clima rio de janeiro',
      'calor extremo rio de janeiro prevenção',
      'chuvas serra fluminense cuidados',
      'sensação térmica rj',
      'previsão do tempo rio de janeiro'
    ],
    category: 'Guias por Estado',
    region: 'Sudeste',
    stateCode: 'RJ',
    stateName: 'Rio de Janeiro',
    relatedCityId: 'rj-rio-de-janeiro',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-13',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'O estado do Rio de Janeiro combina verões com sensação térmica elevadíssima no litoral e na Baixada Fluminense com episódios de chuva orográfica intensa na Região Serrana. Aprenda a se antecipar aos alertas climáticos.',
    keyTakeaways: [
      'A alta umidade litorânea eleva a sensação térmica muito acima da temperatura marcada nos termômetros.',
      'Na Região Serrana e no Sul Fluminense, chuvas persistentes exigem monitoramento constante de encostas e barreiras.',
      'Frentes frias no outono e inverno trazem ressaca marítima e ventos fortes na faixa costeira.'
    ],
    sections: [
      {
        id: 'diversidade-climatica-rj',
        heading: 'O clima fluminense do litoral às montanhas',
        paragraphs: [
          'Embora o Rio de Janeiro seja mundialmente associado ao sol forte e às praias de clima tropical atlântico, o estado possui contrastes climáticos marcantes em curtas distâncias. Na capital, em Niterói e na Baixada Fluminense, o relevo acidentado dos maciços da Tijuca e da Pedra Branca influencia diretamente a circulação dos ventos, criando bolsões onde o calor se acumula com facilidade durante o verão.',
          'Na Região dos Lagos — como Cabo Frio, Arraial do Cabo e Búzios —, o fenômeno da ressurgência marinha traz águas frias à superfície e ventos constantes, tornando o ar mais ventilado e reduzindo a ocorrência de chuvas em comparação à capital. Já em Petrópolis, Teresópolis, Nova Friburgo e no Parque Nacional do Itatiaia, a altitude garante noites frescas o ano todo e temperaturas que podem chegar perto de zero grau nas madrugadas mais rigorosas de julho.'
        ]
      },
      {
        id: 'calor-extremo-sensacao-termica',
        heading: 'Ondas de calor e sensação térmica elevada: como proteger o corpo',
        paragraphs: [
          'Entre novembro e março, bairros da Zona Norte, Zona Oeste e da Baixada Fluminense frequentemente registram temperaturas próximas ou acima dos 38 °C. Quando a umidade relativa permanece alta, o suor evapora mais devagar e a sensação térmica pode ultrapassar facilmente os 43 °C ou 45 °C, impondo estresse severo ao sistema cardiovascular.',
          'Nesses dias, o risco de insolação, desidratação silenciosa e queda de pressão aumenta tanto para trabalhadores ao ar livre quanto para idosos dentro de casas pouco ventiladas. Observar o horário de pico térmico, entre 11h e 16h, é fundamental para organizar atividades externas com segurança.'
        ],
        checklistTitle: 'Protocolo prático nos dias de calor extremo no RJ',
        checklist: [
          'Priorize roupas leves, de cores claras e tecidos naturais como algodão ou linho para facilitar a transpiração.',
          'Intercale água com líquidos ricos em sais minerais naturais ou água de coco caso esteja exposto ao calor por longos períodos.',
          'Utilize protetor solar FPS 50+ reaplicado a cada 2 horas, chapéu de aba larga e óculos com filtro UV certificado.',
          'Em ambientes fechados, feche cortinas voltadas para o sol da tarde e promova ventilação cruzada ao anoitecer.'
        ]
      },
      {
        id: 'chuvas-orograficas-encostas',
        heading: 'Temporais de verão, frentes frias e segurança em áreas serranas',
        paragraphs: [
          'Quando ventos úmidos vindos do oceano encontram paredões montanhosos da Serra dos Órgãos ou do Maciço da Tijuca, o ar é forçado a subir e resfriar rapidamente, gerando chuvas contínuas chamadas de chuvas orográficas. Em cidades serranas e em bairros construídos em encostas, vários dias seguidos de chuva saturam o solo e elevam o risco de deslizamentos.',
          'A prevenção mais eficaz envolve atenção redobrada ao acumulado de chuvas das últimas 72 horas, além da previsão para o dia seguinte. Caso a Defesa Civil estadual ou municipal emita alerta de chuva forte por SMS ou sirene comunitária, o deslocamento antecipado para locais seguros salva vidas.'
        ],
        practicalTip:
          'Evite estacionar veículos próximos a árvores de grande porte ou canais de drenagem durante alertas de vento forte e maré alta; a combinação de maré cheia com chuva intensa retarda o escoamento das águas nas regiões costeiras.'
      },
      {
        id: 'ressaca-maritima-ventos',
        heading: 'Cuidados no litoral durante frentes frias e ressacas',
        paragraphs: [
          'Na transição entre o outono e o inverno, ciclones extratemporais afastados no Atlântico Sul costumam provocar agitação marítima com ondas acima de 2,5 metros ao longo de toda a orla fluminense. Nesses episódios, calçadões e ciclovias próximas à arrebentação podem ser atingidos pela água do mar.',
          'Durante avisos de ressaca da Marinha do Brasil, suspenda banhos de mar, esportes náuticos, pesca em costões rochosos e caminhadas na faixa de areia estreita. As correntes de retorno ficam muito mais intensas mesmo quando o sol reaparece logo após a passagem da frente fria.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Por que a sensação térmica no Rio de Janeiro parece muito maior que a temperatura real?',
        answer:
          'A combinação de calor intenso com umidade alta vinda do Oceano Atlântico dificulta a evaporação natural do suor, impedindo o corpo de dissipar calor com eficiência.'
      },
      {
        question: 'Qual é a época de maior risco de temporais na Região Serrana do RJ?',
        answer:
          'Entre dezembro e março, especialmente durante episódios de Zona de Convergência do Atlântico Sul (ZCAS), quando corredores de umidade mantêm chuva persistente por vários dias consecutivos.'
      }
    ]
  },
  {
    slug: 'clima-minas-gerais-como-se-prevenir',
    title: 'Clima em Minas Gerais (MG): Chuvas de Verão, Frio nas Serras e Tempo Seco',
    metaTitle: 'Clima em Minas Gerais (MG): Previsão, Cuidados e Prevenção | Previsão do Tempo Agora',
    metaDescription:
      'Guia completo do clima em Minas Gerais: saiba como se prevenir nas chuvas de verão em BH e Zona da Mata, no frio do Sul de Minas e na seca do Norte mineiro.',
    keywords: [
      'clima minas gerais',
      'previsão do tempo belo horizonte cuidados',
      'tempo seco minas gerais',
      'chuvas de verão mg prevenção',
      'frio sul de minas'
    ],
    category: 'Guias por Estado',
    region: 'Sudeste',
    stateCode: 'MG',
    stateName: 'Minas Gerais',
    relatedCityId: 'mg-belo-horizonte',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-14',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'Com dimensões continentais e relevo montanhoso, Minas Gerais abriga desde o frio com geadas na Mantiqueira até o semiárido no Vale do Jequitinhonha e Norte do estado. Confira como se proteger em cada cenário.',
    keyTakeaways: [
      'Belo Horizonte, Região Central e Zona da Mata concentram chuvas volumosas entre novembro e março.',
      'O Triângulo Mineiro e o Norte de Minas passam por invernos muito secos, exigindo cuidado redobrado com incêndios e vias respiratórias.',
      'O Sul de Minas registra madrugadas geladas e nevoeiro espesso em rodovias entre maio e agosto.'
    ],
    sections: [
      {
        id: 'mosaico-climatico-mineiro',
        heading: 'Um estado, múltiplos climas: entendendo as regiões de Minas Gerais',
        paragraphs: [
          'Analisar o tempo em Minas Gerais requer olhar para a geografia diversa do estado. Enquanto cidades da Serra da Mantiqueira, como Monte Verde, Maria da Fé e Poços de Caldas, apresentam temperaturas baixas e formação frequente de geadas no inverno, municípios do Norte de Minas — como Montes Claros e Januária — convivem com temperaturas elevadas durante quase o ano inteiro e estação seca prolongada.',
          'Já a Região Metropolitana de Belo Horizonte, o Quadrilátero Ferrífero e a Zona da Mata (incluindo Juiz de Fora e Viçosa) apresentam regime tropical de altitude bem marcado: verões chuvosos sob influência de corredores de umidade vindos da Amazônia e invernos amenos, ensolarados e secos.'
        ]
      },
      {
        id: 'enxurradas-e-corredores-de-umidade',
        heading: 'Período chuvoso: proteção contra enxurradas em terrenos inclinados',
        paragraphs: [
          'Em diversas cidades mineiras construídas entre morros e vales estreitos, a água da chuva ganha grande velocidade ao descer pelas vias inclinadas. Quando um canal de umidade se estabiliza sobre o Sudeste — fenômeno conhecido como ZCAS —, o solo fica encharcado por dias seguidos, aumentando a vulnerabilidade tanto de avenidas canalizadas quanto de encostas urbanas e rodovias serranas.',
          'Em rodovias como a BR-040, BR-381 e BR-262, temporais contínuos elevam a chance de queda de barreiras e aquaplanagem. Consultar o acumulado de chuva antes de pegar a estrada evita trechos bloqueados e situações de perigo.'
        ],
        checklistTitle: 'Prevenção no período chuvoso em Minas Gerais',
        checklist: [
          'Evite circular por avenidas construídas sobre córregos canalizados durante alertas de chuva intensa.',
          'Verifique telhados, calhas e muros de arrimo antes de novembro para garantir drenagem desobstruída.',
          'Nas estradas serranas, mantenha distância maior do veículo à frente e evite ultrapassagens sob chuva forte ou neblina.',
          'Fique atento a sinais de deslizamento como portas que começam a emperrar ou rachaduras recentes em paredes próximas a taludes.'
        ]
      },
      {
        id: 'seca-e-baixa-umidade-interior',
        heading: 'Estação seca no Triângulo Mineiro, Centro e Norte: saúde e prevenção a queimadas',
        paragraphs: [
          'Entre junho e setembro, regiões como Uberlândia, Uberaba, Patos de Minas e Montes Claros costumam registrar longos períodos sem precipitação, com a umidade relativa caindo abaixo de 20% no meio da tarde. Além do desconforto respiratório e do ressecamento da pele, a vegetação seca torna o risco de incêndios florestais e urbanos altíssimo.',
          'Nessa época, qualquer ponta de cigarro, queima de lixo doméstico ou limpeza de terreno com fogo pode se transformar rapidamente em incêndio de grandes proporções empurrado pelos ventos secos da tarde. A fumaça gerada piora ainda mais a qualidade do ar nas cidades vizinhas.'
        ],
        practicalTip:
          'No inverno seco mineiro, colocar um recipiente largo com água ou toalha úmida no quarto à noite ajuda a aliviar a secura nasal, mas lembre-se de trocar a água diariamente para não criar criadouros de mosquitos.'
      },
      {
        id: 'frio-e-geadas-sul-de-minas',
        heading: 'Frio intenso e proteção no Sul de Minas',
        paragraphs: [
          'No Sul e Sudoeste de Minas, frentes frias continentais derrubam rapidamente os termômetros, com impacto direto tanto na rotina doméstica quanto na cafeicultura e horticultura regional. Manhãs com neblina densa pedem cautela redobrada nas estradas até por volta das 9h, quando a radiação solar começa a dissipar a nevoa.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Qual é o período de maior volume de chuvas em Belo Horizonte e no centro de MG?',
        answer:
          'Os meses de novembro, dezembro e janeiro costumam concentrar mais da metade das chuvas anuais em Belo Horizonte e região metropolitana.'
      },
      {
        question: 'Como proteger crianças e idosos do tempo seco em Minas Gerais?',
        answer:
          'Reforçando a ingestão de água, aplicando soro fisiológico nas narinas, usando hidratante corporal após o banho morno e evitando exposição ao sol entre 11h e 16h.'
      }
    ]
  },
  {
    slug: 'clima-espirito-santo-como-se-prevenir',
    title: 'Clima no Espírito Santo (ES): Frentes Frias, Calor Litorâneo e Cuidados no Dia a Dia',
    metaTitle: 'Clima no Espírito Santo (ES): Guia de Tempo e Prevenção | Previsão do Tempo Agora',
    metaDescription:
      'Entenda o clima do Espírito Santo da Grande Vitória às montanhas capixabas. Veja como se prevenir de chuvas fortes, ondas de calor e ventos costeiros.',
    keywords: [
      'clima espírito santo',
      'previsão do tempo vitória es',
      'chuvas espírito santo prevenção',
      'região serrana capixaba clima',
      'calor espírito santo cuidados'
    ],
    category: 'Guias por Estado',
    region: 'Sudeste',
    stateCode: 'ES',
    stateName: 'Espírito Santo',
    relatedCityId: 'es-vitoria',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-14',
    updatedAt: '2026-11-20',
    readTimeMinutes: 6,
    summary:
      'Banhado pelo Atlântico e marcado pela transição entre o Sudeste e o Sul da Bahia, o Espírito Santo combina verões quentes na faixa costeira, ventos nordeste constantes e invernos agradáveis na região serrana.',
    keyTakeaways: [
      'A chegada de frentes frias entre a primavera e o verão pode gerar chuvas intensas em áreas urbanas e vales de rios.',
      'Na Região Serrana (Domingos Martins, Santa Teresa), o inverno traz noites frias e neblina frequente.',
      'O vento nordeste sopra com força na Grande Vitória e litoral norte durante grande parte do ano.'
    ],
    sections: [
      {
        id: 'caracteristicas-climaticas-es',
        heading: 'Do litoral quente às montanhas capixabas',
        paragraphs: [
          'O Espírito Santo apresenta uma variação climática encantadora em poucos quilômetros de distância. Na Região Metropolitana da Grande Vitória — abrangendo Vitória, Vila Velha, Serra e Cariacica —, o clima tropical litorâneo garante temperaturas agradáveis a quentes durante todo o ano, suavizadas pela brisa constante vinda do mar.',
          'Ao subir a BR-262 em direção a Domingos Martins, Marechal Floriano e Pedra Azul, o cenário muda completamente: a altitude transforma o clima em tropical de altitude, com neblina matinal, chuvas mais distribuídas e madrugadas que exigem agasalhos pesados entre maio e agosto. Já no Norte capixaba, em Linhares e São Mateus, as características se aproximam do litoral sul baiano, com verões bem quentes e períodos secos mais pronunciados no inverno.'
        ]
      },
      {
        id: 'chuvas-de-primavera-verao-es',
        heading: 'Chuvas concentradas e prevenção contra alagamentos',
        paragraphs: [
          'Os maiores volumes de chuva no Espírito Santo acontecem entre novembro e janeiro, especialmente quando sistemas frontais permanecem bloqueados sobre o litoral capixaba. Cidades cortadas por grandes bacias hidrográficas, como a do Rio Doce e a do Rio Itapemirim, além de áreas baixas da Grande Vitória, demandam acompanhamento atento quando a previsão aponta chuva contínua por mais de três dias.',
          'Nesses cenários, pequenos rios e canais urbanos sofrem influência direta da maré alta, tornando o escoamento mais lento. Planejar rotas longe de pontos historicamente alagáveis e proteger móveis e documentos em áreas suscetíveis evita prejuízos materiais.'
        ],
        checklistTitle: 'Checklist preventivo para temporais no Espírito Santo',
        checklist: [
          'Acompanhe os boletins da Defesa Civil Estadual quando frentes frias avançarem pelo litoral entre outubro e março.',
          'Mantenha desobstruídos ralos, caixas de passagem e calhas em residências próximas a áreas baixas.',
          'Em viagens pelas rodovias serranas sob chuva contínua, redobre a atenção para pequenos escorregamentos de terra nas margens da pista.',
          'Evite atividades no mar quando houver previsão de ventos fortes associados à mudança de tempo.'
        ]
      },
      {
        id: 'protecao-solar-ventos',
        heading: 'Índice UV elevado e proteção contra o vento costeiro',
        paragraphs: [
          'Por estar em latitude tropical com muitos dias de céu aberto fora da estação chuvosa, o Espírito Santo registra índices de radiação ultravioleta entre alto e extremo durante quase todo o ano. Mesmo quando o vento nordeste refresca a sensação na praia, a radiação solar continua intensa.',
          'Use filtro solar diariamente mesmo em dias de vento fresco, proteja os olhos contra poeira e reflexo marinho e mantenha hidratação constante durante caminhadas na orla ou atividades de trabalho sob o sol.'
        ],
        practicalTip:
          'O vento fresco do litoral engana a percepção de calor: mesmo sem transpirar muito, a exposição solar entre 10h e 15h provoca queimaduras e fotoenvelhecimento se não houver reaplicação regular de protetor.'
      }
    ],
    faqs: [
      {
        question: 'Qual é a época mais chuvosa no Espírito Santo?',
        answer:
          'De novembro a janeiro ocorrem os maiores acumulados, embora frentes frias de primavera e outono também possam provocar chuvas fortes isoladas.'
      },
      {
        question: 'Faz frio na região serrana do Espírito Santo?',
        answer:
          'Sim. Entre junho e agosto, cidades como Domingos Martins e Venda Nova do Imigrante registram madrugadas abaixo de 10 °C com frequência.'
      }
    ]
  },
  {
    slug: 'clima-parana-como-se-prevenir',
    title: 'Clima no Paraná (PR): Frio, Geadas, Tempestades e Como se Proteger em Todas as Regiões',
    metaTitle: 'Clima no Paraná (PR): Guia Completo e Prevenção | Previsão do Tempo Agora',
    metaDescription:
      'Saiba como funciona o clima no Paraná: geadas no centro-sul, tempestades no oeste, garoa em Curitiba e calor no norte. Dicas práticas de proteção.',
    keywords: [
      'clima no paraná',
      'previsão do tempo curitiba cuidados',
      'geada no paraná proteção',
      'temporais oeste do paraná',
      'mudança de tempo paraná'
    ],
    category: 'Guias por Estado',
    region: 'Sul',
    stateCode: 'PR',
    stateName: 'Paraná',
    relatedCityId: 'pr-curitiba',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-15',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'O Paraná concentra algumas das variações térmicas mais rápidas do Brasil: da garoa fria de Curitiba às tempestades severas no Oeste e às ondas de calor do Norte pioneiro. Descubra como proteger sua casa, saúde e viagens.',
    keyTakeaways: [
      'A passagem de frentes frias pelo Oeste paranaense frequentemente gera vendavais, raios e granizo.',
      'No inverno, massas polares derrubam as temperaturas abaixo de 0 °C nos Campos Gerais e Centro-Sul, formando geadas.',
      'Curitiba e Região Metropolitana têm alta variação térmica e umidade elevada ao longo de quase todo o ano.'
    ],
    sections: [
      {
        id: 'regioes-climaticas-pr',
        heading: 'O contraste entre o Norte quente e os planaltos frios do Paraná',
        paragraphs: [
          'O território paranaense é cortado pelo Trópico de Capricórnio, o que explica sua enorme diversidade térmica. Ao Norte e Noroeste — em cidades como Londrina, Maringá e Paranavaí —, o verão é muito quente e o clima se aproxima do tropical úmido, embora ainda sofra incursões de frentes frias marcantes no inverno.',
          'Já nos planaltos Central, Sul e Leste — passando por Guarapuava, Ponta Grossa, Palmas e Curitiba —, o clima subtropical de altitude traz invernos rigorosos, nevoeiros persistentes e chuvas bem distribuídas durante os doze meses. No Oeste, região de Foz do Iguaçu e Cascavel, a proximidade com a Bacia do Prata favorece sistemas convectivos intensos que geram tempestades com raios e ventos fortes.'
        ]
      },
      {
        id: 'tempestades-granizo-ventos',
        heading: 'Tempestades severas, rajadas de vento e granizo: como agir',
        paragraphs: [
          'Entre a primavera e o verão, a entrada de ar quente e úmido do Norte do continente encontra frentes frias vindas da Argentina e do Sul, formando nuvens de grande desenvolvimento vertical sobre o Oeste, Sudoeste e Norte do Paraná. Esses sistemas trazem risco real de queda de granizo, rajadas acima de 70 km/h e interrupções temporárias no fornecimento de energia elétrica.',
          'Manter manutenção periódica em telhados, podar galhos próximos à fiação elétrica com auxílio da prefeitura e acompanhar avisos meteorológicos de curto prazo são atitudes decisivas para reduzir prejuízos.'
        ],
        checklistTitle: 'Medidas de segurança contra ventos fortes e granizo no PR',
        checklist: [
          'Verifique a fixação de telhas, antenas e toldos antes da primavera, época em que os vendavais são mais comuns.',
          'Tenha lanternas recarregáveis, power bank carregado e água potável reserva caso haja queda de energia durante tempestades.',
          'Ao primeiro sinal de granizo no trânsito, busque abrigo seguro sob coberturas sólidas — evitando parar sob árvores.',
          'Desconecte equipamentos eletrônicos da tomada e evite usar aparelhos conectados à rede elétrica enquanto houver trovoadas próximas.'
        ]
      },
      {
        id: 'inverno-geada-cuidados',
        heading: 'Inverno rigoroso, nevoeiro e proteção contra geadas',
        paragraphs: [
          'Entre maio e setembro, massas de ar polar derrubam as temperaturas em todo o estado, provocando geadas amplas principalmente no Centro-Sul, Campos Gerais e Região Metropolitana de Curitiba. Em manhãs geladas, a sensação térmica cai ainda mais quando há vento, exigindo atenção especial com crianças pequenas, idosos e pessoas em situação de vulnerabilidade.',
          'Em ambientes fechados, é fundamental tomar extremo cuidado com aquecedores a gás, lareiras ou braseiros: nunca utilize esses equipamentos em cômodos totalmente vedados devido ao risco silencioso de intoxicação por monóxido de carbono.'
        ],
        practicalTip:
          'Para quem dirige cedo entre Curitiba, Ponta Grossa e o litoral pela BR-277 ou BR-376, o nevoeiro cerrado nas madrugadas de outono e inverno exige redução imediata de velocidade e uso correto do farol baixo e de neblina.'
      }
    ],
    faqs: [
      {
        question: 'Em quais meses ocorrem mais geadas no Paraná?',
        answer:
          'As geadas são mais frequentes entre junho e agosto, podendo ocorrer episódios precoces em maio ou tardios em setembro nas áreas mais altas.'
      },
      {
        question: 'Por que o tempo em Curitiba muda tão rápido no mesmo dia?',
        answer:
          'A altitude de cerca de 930 metros combinada com a umidade trazida da Serra do Mar pelo vento leste faz com que nuvens baixas e frentes frias mudem temperatura e luminosidade em poucas horas.'
      }
    ]
  },
  {
    slug: 'clima-santa-catarina-como-se-prevenir',
    title: 'Clima em Santa Catarina (SC): Ciclones, Frio na Serra, Enchentes e Prevenção',
    metaTitle: 'Clima em Santa Catarina (SC): Guia Completo de Prevenção | Previsão do Tempo Agora',
    metaDescription:
      'Saiba como se proteger dos extremos climáticos em Santa Catarina: frio intenso na Serra, cheias no Vale do Itajaí, ciclones no litoral e temporais no Oeste.',
    keywords: [
      'clima santa catarina',
      'previsão do tempo florianópolis',
      'enchente vale do itajaí prevenção',
      'frio serra catarinense cuidados',
      'ciclone extratropical santa catarina'
    ],
    category: 'Guias por Estado',
    region: 'Sul',
    stateCode: 'SC',
    stateName: 'Santa Catarina',
    relatedCityId: 'sc-florianopolis',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-15',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'Santa Catarina possui estações bem definidas e enfrenta desafios climáticos específicos em cada região: cheias no Vale do Itajaí, vento costeiro e ciclones no litoral e temperaturas negativas na Serra Catarinense.',
    keyTakeaways: [
      'O Vale do Itajaí, Grande Florianópolis e Norte catarinense exigem monitoramento de rios quando há chuva persistente.',
      'Na Serra Catarinense (Urupema, São Joaquim, Urubici), o inverno traz geadas fortes, congelamento de pistas e eventual neve.',
      'Ciclones extratemporais próximos à costa trazem rajadas intensas e mar agitado.'
    ],
    sections: [
      {
        id: 'quatro-estacoes-sc',
        heading: 'As quatro estações bem definidas em Santa Catarina',
        paragraphs: [
          'Diferente da maior parte do Brasil tropical, Santa Catarina apresenta inverno frio, primavera tempestuosa, verão quente e outono ameno. No litoral — de Joinville e Balneário Camboriú até Florianópolis e Laguna —, a influência oceânica mantém a umidade elevada e temperaturas confortáveis na maior parte do ano, com picos de calor em janeiro e fevereiro.',
          'No Planalto Serrano, o frio é protagonista durante vários meses, enquanto o Oeste catarinense (Chapecó e região) experimenta verões muito quentes e tempestades intensas típicas do interior subtropical.'
        ]
      },
      {
        id: 'ciclones-e-chuvas-vale-itajai',
        heading: 'Cheias, ciclones e ventanias: como preparar sua família e residência',
        paragraphs: [
          'A topografia catarinense, especialmente no Vale do Itajaí (Blumenau, Rio do Sul, Brusque) e no Sul do estado, concentra águas das serras em vales povoados. Quando sistemas de baixa pressão ou ciclones extratemporais atuam perto do litoral, os volumes de chuva podem subir rapidamente em poucas horas.',
          'Além da elevação dos rios, ventos fortes ligados a ciclones exigem atenção com estruturas externas, embarcações e fiação elétrica. Quem vive em áreas com histórico de alagamento ou enxurrada ganha tempo precioso ao acompanhar alertas oficiais da Defesa Civil de SC.'
        ],
        checklistTitle: 'Prevenção residencial e pessoal em Santa Catarina',
        checklist: [
          'Conheça o nível de cota de inundação do seu bairro caso more no Vale do Itajaí, Norte ou Sul catarinense.',
          'Guarde documentos pessoais, remédios contínuos e itens essenciais em local alto e protegido por embalagens impermeáveis.',
          'Recolha objetos soltos de varandas e quintais quando houver aviso de vento forte costeiro.',
          'Evite circular por rodovias litorâneas ou pontes baixas durante alertas de enxurrada e maré elevada.'
        ]
      },
      {
        id: 'frio-serra-gelo-pista',
        heading: 'Frio extremo e congelamento na Serra Catarinense',
        paragraphs: [
          'Em municípios como São Joaquim, Urupema, Bom Jardim da Serra e Urubici, as temperaturas negativas no inverno congelam gramados, tubulações expostas e trechos sombreados do asfalto. Turistas e moradores devem redobrar a cautela ao dirigir pela Serra do Rio do Rastro e Serra do Corvo Branco nas primeiras horas da manhã, quando pode haver gelo na pista e neblina espessa.'
        ],
        practicalTip:
          'Em casas de regiões muito frias, proteja registros e canos de água externos com isolamento térmico simples para evitar rachaduras durante madrugadas abaixo de zero grau.'
      }
    ],
    faqs: [
      {
        question: 'Qual a época com maior risco de enchentes em Santa Catarina?',
        answer:
          'Embora possa chover forte em qualquer estação, episódios de chuva volumosa e cheias costumam ocorrer com mais frequência entre a primavera (setembro–novembro) e o verão, além de eventos ligados ao El Niño.'
      },
      {
        question: 'Quando costuma nevar ou gear forte na Serra Catarinense?',
        answer:
          'Entre junho e agosto, especialmente quando fortes massas polares avançam com umidade residual pelo estado.'
      }
    ]
  },
  {
    slug: 'clima-rio-grande-do-sul-como-se-prevenir',
    title: 'Clima no Rio Grande do Sul (RS): Frio Polar, Temporais, Vento Minuano e Prevenção',
    metaTitle: 'Clima no Rio Grande do Sul (RS): Prevenção Contra Temporais e Frio | Previsão Agora',
    metaDescription:
      'Entenda o comportamento climático do Rio Grande do Sul: frentes frias, ciclones, chuvas extremas, granizo, geadas e como proteger família, casa e deslocamentos.',
    keywords: [
      'clima rio grande do sul',
      'previsão do tempo porto alegre prevenção',
      'enchentes rio grande do sul cuidados',
      'frio intenso rs proteção',
      'temporal granizo rio grande do sul'
    ],
    category: 'Guias por Estado',
    region: 'Sul',
    stateCode: 'RS',
    stateName: 'Rio Grande do Sul',
    relatedCityId: 'rs-porto-alegre',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-16',
    updatedAt: '2026-11-20',
    readTimeMinutes: 8,
    summary:
      'Porta de entrada das frentes frias e massas polares no Brasil, o Rio Grande do Sul enfrenta tanto extremos de chuva e tempestades severas quanto ondas de frio intenso e verões abafados na Campanha e Região Metropolitana.',
    keyTakeaways: [
      'Frentes frias estacionárias sobre o território gaúcho podem provocar volumes excepcionais de chuva em bacias como Taquari, Jacuí, Caí e Guaíba.',
      'A primavera e o verão concentram tempestades com rajadas de vento e granizo.',
      'No inverno, a combinação de umidade e vento frio (Minuano) reduz drasticamente a sensação térmica.'
    ],
    sections: [
      {
        id: 'dinamica-atmosferica-rs',
        heading: 'Por que o tempo no Rio Grande do Sul é tão dinâmico',
        paragraphs: [
          'Localizado na latitude mais ao sul do país, o Rio Grande do Sul fica na rota direta dos sistemas frontais que cruzam o Cone Sul da América do Sul. Isso faz com que o estado experimente trocas abruptas de massa de ar: em menos de 24 horas, uma tarde quente de 32 °C em Porto Alegre ou Santa Maria pode dar lugar a temporais seguidos por ventos frios de 10 °C.',
          'As diferenças regionais também são evidentes. A Campanha e a Fronteira Oeste (Uruguaiana, Bagé, Alegrete) têm grande amplitude térmica, com verões muito quentes e invernos secos e gelados. Já a Serra Gaúcha (Caxias do Sul, Gramado, Canela) registra alta umidade, neblina frequente e frio intenso, enquanto o Litoral Norte e Sul sofrem influência direta de ventos marítimos fortes.'
        ]
      },
      {
        id: 'chuvas-extremas-bacias-rs',
        heading: 'Chuvas persistentes e cheias: plano de prevenção familiar',
        paragraphs: [
          'Quando bloqueios atmosféricos mantêm o ar quente ao norte e o ar frio ao sul, as frentes frias ficam estacionadas sobre o Rio Grande do Sul, gerando chuvas contínuas por vários dias. Nessa situação, o nível de rios nos vales (como Taquari-Antas, Caí, Sinos, Gravataí e Uruguai) sobe rapidamente mesmo após a chuva diminuir localmente, pois toda a água drenada das áreas serranas desce para as planícies.',
          'Ter um plano familiar pré-definido e acompanhar alertas oficiais da Defesa Civil estadual ajuda moradores de zonas ribeirinhas ou urbanas baixas a agir com calma antes que estradas e acessos fiquem bloqueados.'
        ],
        checklistTitle: 'Checklist de preparo para chuvas fortes no Rio Grande do Sul',
        checklist: [
          'Cadastre-se no sistema de alertas por SMS da Defesa Civil (enviando seu CEP para 40199) para receber avisos em tempo real.',
          'Tenha uma mochila pronta com documentos em saco plástico vedado, medicamentos de uso contínuo, lanterna, bateria portátil e muda de roupa seca.',
          'Desligue a chave geral de energia caso haja risco iminente de entrada de água dentro da residência.',
          'Jamais tente atravessar pontilhões alagados ou áreas com correnteza no interior ou nas cidades.'
        ]
      },
      {
        id: 'inverno-minuano-saude',
        heading: 'Frio intenso, vento Minuano e saúde respiratória',
        paragraphs: [
          'Durante o outono e o inverno, o vento frio conhecido como Minuano torna a sensação térmica muito inferior à temperatura do termômetro, especialmente em áreas abertas do Pampa e da zona portuária de Rio Grande e Pelotas. Em ambientes fechados com alta umidade, roupas e paredes custam a secar, favorecendo mofo e crises alérgicas.',
          'Ventile a casa por pelo menos 30 minutos nos horários mais secos do dia, vista-se em camadas (segunda pele térmica, malha intermediária e casaco corta-vento) e tenha cuidado rigoroso com sistemas de aquecimento a combustão.'
        ],
        practicalTip:
          'Durante estiagens de verão na Fronteira Oeste e Campanha, o monitoramento da previsão ajuda produtores rurais e moradores a economizar água e evitar focos de fogo em pastagens secas.'
      }
    ],
    faqs: [
      {
        question: 'Qual a diferença entre frio seco e frio úmido no Rio Grande do Sul?',
        answer:
          'Logo após a frente fria entrar, a umidade alta e o vento provocam sensação térmica cortante. Nos dias seguintes, sob massa polar seca, as madrugadas ficam mais geladas com geada, mas as tardes são ensolaradas.'
      },
      {
        question: 'Quando ocorrem os temporais com granizo mais fortes no RS?',
        answer:
          'Principalmente entre setembro e março, quando massas de ar quente e úmido vindas do Norte colidem com frentes frias sobre o estado.'
      }
    ]
  },
  {
    slug: 'clima-distrito-federal-como-se-prevenir',
    title: 'Clima no Distrito Federal (DF): Seca Extrema, Chuvas de Verão e Cuidados em Brasília',
    metaTitle: 'Clima no Distrito Federal (DF): Seca, Chuvas e Prevenção | Previsão Agora',
    metaDescription:
      'Saiba como enfrentar a seca extrema e a estação das chuvas em Brasília e no Distrito Federal com dicas práticas de saúde, proteção solar e segurança.',
    keywords: [
      'clima distrito federal',
      'previsão do tempo brasília cuidados',
      'seca em brasília umidade do ar',
      'chuvas brasília df',
      'como se proteger do tempo seco df'
    ],
    category: 'Guias por Estado',
    region: 'Centro-Oeste',
    stateCode: 'DF',
    stateName: 'Distrito Federal',
    relatedCityId: 'df-brasilia',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-16',
    updatedAt: '2026-11-20',
    readTimeMinutes: 6,
    summary:
      'O Distrito Federal vive duas estações bem demarcadas ao longo do ano: um período longo de seca intensa entre maio e setembro, e uma estação chuvosa com pancadas de fim de tarde entre outubro e abril. Veja como se cuidar em cada fase.',
    keyTakeaways: [
      'Entre agosto e setembro, a umidade do ar no DF frequentemente cai abaixo de 15%, exigindo cuidados médicos preventivos.',
      'Entre novembro e março ocorrem pancadas intensas de chuva com raios e alagamentos pontuais em passagens subterrâneas (tesourinhas).',
      'O índice UV em Brasília permanece alto durante todo o ano devido à altitude do Planalto Central e ao céu aberto.'
    ],
    sections: [
      {
        id: 'duas-estacoes-df',
        heading: 'O ritmo das duas estações no Planalto Central',
        paragraphs: [
          'Situado a mais de 1.000 metros de altitude no coração do Cerrado brasileiro, o Distrito Federal possui um clima tropical de altitude com duas estações altamente previsíveis. De outubro a abril, a umidade vinda da Amazônia alimenta nuvens carregadas que trazem chuvas regulares, tardes abafadas e noites agradáveis.',
          'De maio a setembro, no entanto, a circulação atmosférica seca bloqueia a chegada de chuvas e deixa o céu azul por semanas consecutivas. Nesse período, as madrugadas podem ser surpreendentemente frias (chegando perto de 10 °C a 12 °C em áreas abertas), enquanto as tardes ficam quentes e extremamente secas.'
        ]
      },
      {
        id: 'seca-extrema-brasilia',
        heading: 'Sobrevivendo à seca do DF com saúde: umidade abaixo de 20%',
        paragraphs: [
          'No auge da estiagem brasiliense, entre julho e meados de setembro, a umidade relativa pode cair para níveis comparáveis aos de regiões desérticas durante a tarde, frequentemente entre 12% e 18%. Esse ressecamento intenso provoca sangramentos nasais, garganta irritada, olhos ardendo, rachaduras labiais e fadiga.',
          'Além do desconforto pessoal, a baixa umidade acelera a propagação de queimadas no Cerrado ao redor das regiões administrativas, lançando fumaça e fuligem sobre a cidade. Adaptar a rotina de hidratação e atividades físicas é indispensável.'
        ],
        checklistTitle: 'Guia diário para enfrentar a seca no Distrito Federal',
        checklist: [
          'Beba água regularmente ao longo de todo o expediente; mantenha sempre uma garrafa por perto em deslocamentos.',
          'Suspenda exercícios físicos intensos ao ar livre entre 10h e 17h quando a umidade estiver abaixo de 20%.',
          'Use hidratante labial, colírio lubrificante (quando orientado por médico) e soro fisiológico nasal várias vezes ao dia.',
          'Umidifique o quarto antes de dormir com umidificador limpo ou bacia de água fresca, evitando acionar o aparelho por horas excessivas se surgir umidade nas paredes.'
        ]
      },
      {
        id: 'chuvas-tesourinhas-raios',
        heading: 'Estação chuvosa: atenção em tesourinhas, eixões e descargas elétricas',
        paragraphs: [
          'Quando as chuvas retornam em outubro e se intensificam entre dezembro e fevereiro, os temporais costumam vir acompanhados de forte atividade elétrica e rajadas de vento. Em Brasília, passagens subterrâneas ("tesourinhas") e trechos rebaixados acumulam água rapidamente quando há chuvas concentradas em curto intervalo.',
          'Ao planejar deslocamentos pelo Plano Piloto ou regiões administrativas no fim da tarde, verifique o radar horário e evite locais sem escoamento imediato durante temporais.'
        ],
        practicalTip:
          'Mesmo no inverno frio da manhã em Brasília, não dispense o protetor solar: a altitude elevada e a ausência de nuvens mantêm a radiação UV muito forte já a partir das 9h.'
      }
    ],
    faqs: [
      {
        question: 'Quais os piores meses da seca no Distrito Federal?',
        answer:
          'Agosto e setembro costumam registrar os menores índices de umidade relativa do ar do ano, frequentemente abaixo de 15% no período da tarde.'
      },
      {
        question: 'Quando voltam as chuvas em Brasília?',
        answer:
          'As primeiras pancadas de transição costumam aparecer no fim de setembro ou em outubro, firmando-se de forma mais regular a partir de novembro.'
      }
    ]
  },
  {
    slug: 'clima-goias-como-se-prevenir',
    title: 'Clima em Goiás (GO): Estiagem no Cerrado, Chuvas de Verão e Proteção Diária',
    metaTitle: 'Clima em Goiás (GO): Guia Completo de Prevenção | Previsão do Tempo Agora',
    metaDescription:
      'Veja como funciona o clima em Goiás: seca prolongada, ondas de calor, queimadas e temporais de verão. Cuidados essenciais para saúde, casa e estradas.',
    keywords: [
      'clima em goiás',
      'previsão do tempo goiânia',
      'tempo seco goiás cuidados',
      'calor goiás prevenção',
      'chuvas em goiás'
    ],
    category: 'Guias por Estado',
    region: 'Centro-Oeste',
    stateCode: 'GO',
    stateName: 'Goiás',
    relatedCityId: 'go-goiania',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-17',
    updatedAt: '2026-11-20',
    readTimeMinutes: 6,
    summary:
      'No coração do Cerrado, Goiás enfrenta contrastes nítidos entre mais de cem dias seguidos de estiagem no inverno e tempestades intensas no verão. Confira medidas práticas para cuidar da saúde, da casa e do trânsito.',
    keyTakeaways: [
      'Goiânia, Anápolis, Rio Verde e todo o estado passam por seca severa entre maio e setembro.',
      'Setembro e outubro costumam registrar picos de calor antes da chegada plena da estação chuvosa.',
      'Temporais de verão exigem atenção a raios e pontos de alagamento em córregos urbanos.'
    ],
    sections: [
      {
        id: 'caracteristicas-clima-goiano',
        heading: 'Clima tropical típico em todo o território goiano',
        paragraphs: [
          'Goiás apresenta clima tropical semiúmido com duas estações muito claras: verão chuvoso, de outubro a abril, e inverno seco, de maio a setembro. Na região de Goiânia, Aparecida de Goiânia e Anápolis, a altitude moderada garante noites um pouco mais amenas durante o inverno, enquanto áreas mais baixas ao norte e oeste — como o Vale do Araguaia — mantêm temperaturas elevadas o ano todo.',
          'O momento mais crítico do calendário climático goiano ocorre justamente na virada do inverno para a primavera, entre agosto e início de outubro. Com o solo completamente seco e o sol alto no horizonte, os termômetros sobem facilmente acima dos 36 °C enquanto a umidade cai abaixo de 20%.'
        ]
      },
      {
        id: 'prevencao-seca-calor-queimadas',
        heading: 'Proteção contra calor seco, poeira e fumaça de queimadas',
        paragraphs: [
          'Durante a estiagem goiana, a poeira fina suspensa no ar e a fumaça eventual de incêndios em áreas de Cerrado aumentam muito os casos de infecções respiratórias, alergias e crises de bronquite. Em cidades agrícolas como Rio Verde e Jataí, o vento seco também levanta poeira de estradas vicinais e lavouras.',
          'Adotar medidas preventivas em casa e evitar qualquer uso de fogo para limpar lotes ou queimar folhas secas é fundamental para proteger toda a comunidade.'
        ],
        checklistTitle: 'Cuidados na estação seca e quente de Goiás',
        checklist: [
          'Reforce a ingestão de água pura e alimentos ricos em líquidos (melancia, laranja, melão) diariamente.',
          'Limpe filtros de ar-condicionado e ventiladores antes da temporada seca para não circular poeira acumulada.',
          'Nunca ateie fogo em mato seco ou lixo doméstico; além de crime ambiental, o fogo foge do controle em minutos com o ar seco.',
          'Proteja a pele com hidratante e protetor solar todos os dias, inclusive em trajetos curtos de carro ou moto.'
        ]
      },
      {
        id: 'temporais-de-verao-go',
        heading: 'Estação das chuvas: cuidados com raios e enxurradas rápidas',
        paragraphs: [
          'Quando o corredor de umidade amazônico se estabelece entre novembro e março, as chuvas em Goiás ganham volume e frequência, frequentemente na forma de pancadas fortes no fim da tarde. Córregos urbanos da capital e cidades do entorno transbordam rapidamente quando a chuva supera a capacidade de drenagem.',
          'Em áreas rurais ou propriedades abertas, a incidência de raios é bastante alta nos primeiros temporais da primavera; procure abrigo fechado ao ouvir trovões mesmo antes de a chuva começar.'
        ],
        practicalTip:
          'Antes de pegar rodovias como a BR-060 ou BR-153 no período chuvoso, verifique o estado dos pneus e das palhetas do limpador de para-brisa para evitar aquaplanagem nas pancadas súbitas.'
      }
    ],
    faqs: [
      {
        question: 'Qual é o mês mais quente em Goiânia e em Goiás?',
        answer:
          'Setembro e o início de outubro costumam registrar as temperaturas máximas mais elevadas do ano, logo antes da regularização das chuvas.'
      },
      {
        question: 'Por que faz frio de madrugada no inverno se faz tanto calor de tarde em Goiás?',
        answer:
          'O ar muito seco e o céu sem nuvens permitem que a superfície perca calor rapidamente durante a noite, provocando queda acentuada entre a tarde e a madrugada.'
      }
    ]
  },
  {
    slug: 'clima-mato-grosso-como-se-prevenir',
    title: 'Clima no Mato Grosso (MT): Calor Intenso, Pantanal, Amazônia e Prevenção',
    metaTitle: 'Clima no Mato Grosso (MT): Guia de Calor, Seca e Chuvas | Previsão Agora',
    metaDescription:
      'Entenda o clima do Mato Grosso em Cuiabá, Cerrado, Amazônia e Pantanal. Saiba como se proteger do calor extremo, fumaça de queimadas e temporais.',
    keywords: [
      'clima mato grosso',
      'previsão do tempo cuiabá cuidados',
      'calor extremo cuiabá prevenção',
      'seca pantanal cuidados',
      'umidade do ar mato grosso'
    ],
    category: 'Guias por Estado',
    region: 'Centro-Oeste',
    stateCode: 'MT',
    stateName: 'Mato Grosso',
    relatedCityId: 'mt-cuiaba',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-17',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'Abrangendo três grandes biomas — Amazônia, Cerrado e Pantanal —, o Mato Grosso combina temperaturas entre as mais altas do país com estação seca severa e verões muito chuvosos. Aprenda a se proteger ao longo do ano.',
    keyTakeaways: [
      'Cuiabá e a Baixada Cuiabana enfrentam calor persistente com máximas que ultrapassam facilmente 38 °C na seca.',
      'O Norte mato-grossense (Sinop, Sorriso, Alta Floresta) sofre maior influência de chuvas amazônicas entre dezembro e março.',
      'A prevenção contra incêndios florestais e proteção contra calor extremo são prioridades entre julho e outubro.'
    ],
    sections: [
      {
        id: 'tres-biomas-mt',
        heading: 'Clima no Mato Grosso: Amazônia, Cerrado e Pantanal',
        paragraphs: [
          'Mato Grosso é um estado singular por reunir três biomas de dinâmicas distintas. No Norte, a floresta amazônica mantém maior umidade relativa mesmo nos meses com menos chuva, embora o período chuvoso de verão seja bastante volumoso. No Centro e Leste, o Cerrado (Chapada dos Guimarães, Rondonópolis, Primavera do Leste) tem estações secas e chuvosas altamente contrastantes.',
          'Na Baixada Cuiabana e no Pantanal mato-grossense, a baixa altitude e o relevo em forma de depressão dificultam a circulação de ventos, concentrando o calor. Curiosamente, o estado também experimenta eventuais episódios de "friagem" entre maio e agosto, quando fortes massas polares conseguem avançar pelo interior do continente e derrubar as temperaturas por alguns dias.'
        ]
      },
      {
        id: 'calor-extremo-cuiaba',
        heading: 'Calor acima de 40 °C: como evitar exaustão térmica e insolação',
        paragraphs: [
          'Entre agosto e outubro, antes da chegada regular das chuvas, cidades como Cuiabá, Várzea Grande e Cáceres frequentemente superam os 39 °C ou 40 °C à sombra. Nesse cenário, o interior de veículos estacionados ao sol atinge temperaturas perigosas em poucos minutos, e trabalhos ao ar livre sem pausas geram exaustão térmica grave.',
          'Reconhecer os primeiros sinais de alerta no corpo — tontura, dor de cabeça latejante, náusea, pele muito quente ou cãibras — permite interromper a exposição e buscar resfriamento imediato antes de um quadro de emergência.'
        ],
        checklistTitle: 'Proteção essencial contra calor extremo no MT',
        checklist: [
          'Nunca deixe crianças, idosos ou animais dentro de carros estacionados, mesmo por dois minutos ou com vidros entreabertos.',
          'Reorganize tarefas pesadas ao ar livre para o início da manhã (antes das 9h30) ou após as 17h.',
          'Use chapéu, roupas leves de proteção UV e reponha eletrólitos se houver transpiração intensa.',
          'Mantenha ambientes de trabalho ventilados e ofereça água fresca com frequência para toda a família.'
        ]
      },
      {
        id: 'fumaca-seca-e-chuvas-verao',
        heading: 'Qualidade do ar na seca e cuidados nos temporais de verão',
        paragraphs: [
          'Durante a estiagem prolongada, o risco de queimadas no Cerrado e no Pantanal se multiplica. Quando a fumaça se concentra sobre áreas urbanas, pessoas com asma, cardiopatias, gestantes e crianças precisam reduzir esforços físicos e manter portas e janelas fechadas nos horários de maior concentração de partículas.',
          'Já entre dezembro e março, as tempestades de verão chegam com grande quantidade de raios e rajadas capazes de derrubar redes elétricas em cidades e fazendas.'
        ],
        practicalTip:
          'Se a qualidade do ar piorar por fumaça na seca, máscaras bem ajustadas do tipo PFF2/N95 filtram com eficácia as partículas finas inaláveis durante deslocamentos externos.'
      }
    ],
    faqs: [
      {
        question: 'Cuiabá faz frio alguma vez no ano?',
        answer:
          'Sim, durante episódios fortes de friagem no inverno (geralmente entre junho e agosto), a temperatura pode cair rapidamente para a faixa de 10 °C a 14 °C por alguns dias antes de voltar a subir.'
      },
      {
        question: 'Qual é o período de cheias no Pantanal mato-grossense?',
        answer:
          'As chuvas acontecem principalmente entre dezembro e março nas cabeceiras dos rios, e o pico das águas na planície pantaneira costuma ocorrer entre fevereiro e maio.'
      }
    ]
  },
  {
    slug: 'clima-mato-grosso-do-sul-como-se-prevenir',
    title: 'Clima no Mato Grosso do Sul (MS): Tempestades, Frio Repentino, Seca e Proteção',
    metaTitle: 'Clima no Mato Grosso do Sul (MS): Prevenção e Previsão | Previsão Agora',
    metaDescription:
      'Veja como se proteger dos extremos do tempo no Mato Grosso do Sul: tempestades severas, frentes frias bruscas, calor no Pantanal e tempo seco em Campo Grande.',
    keywords: [
      'clima mato grosso do sul',
      'previsão do tempo campo grande',
      'vendavais mato grosso do sul',
      'frio dourados ponta porã',
      'calor pantanal ms cuidados'
    ],
    category: 'Guias por Estado',
    region: 'Centro-Oeste',
    stateCode: 'MS',
    stateName: 'Mato Grosso do Sul',
    relatedCityId: 'ms-campo-grande',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-18',
    updatedAt: '2026-11-20',
    readTimeMinutes: 6,
    summary:
      'Corredor natural entre o clima subtropical do Sul e o tropical do Centro-Oeste, o Mato Grosso do Sul experimenta tempestades vigorosas na primavera, frio intenso no sul do estado e calor elevado no Pantanal.',
    keyTakeaways: [
      'A metade sul do estado (Dourados, Ponta Porã) sofre com frentes frias severas, geadas e tempestades de vento.',
      'Campo Grande e o Leste enfrentam inverno seco com queda brusca de temperatura na entrada de massas polares.',
      'Corumbá e o Pantanal sul-mato-grossense atingem calor extremo entre agosto e novembro.'
    ],
    sections: [
      {
        id: 'corredor-climatico-ms',
        heading: 'Um estado na rota das mudanças rápidas de massa de ar',
        paragraphs: [
          'Por fazer fronteira com o Paraguai, a Bolívia e o Paraná, o Mato Grosso do Sul funciona como um corredor atmosférico aberto. Quando frentes frias avançam pelo continente, não encontram barreiras montanhosas altas para freá-las: assim, em poucas horas, o vento vira para o quadrante sul, derrubando a temperatura de forma impressionante.',
          'Em Campo Grande, o clima tropical com estação seca marcada no inverno divide espaço com verões chuvosos e ventos frequentes. No Sul do estado — como em Dourados, Naviraí e Ponta Porã —, as chuvas se distribuem melhor ao longo do ano, mas o risco de geadas no inverno e vendavais na primavera é bastante elevado.'
        ]
      },
      {
        id: 'tempestades-poeira-ventos-ms',
        heading: 'Tempestades de vento, poeira e raios: como se proteger',
        paragraphs: [
          'Na transição entre o fim da seca e o início das chuvas (entre setembro e novembro), rajadas convectivas avançam sobre campos secos e rodovias retas do Mato Grosso do Sul, podendo levantar nuvens densas de poeira antes mesmo da precipitação. Esse fenômeno reduz a visibilidade a quase zero nas rodovias federais do estado.',
          'Caso encontre poeira ou tempestade repentina na estrada, jamais freie bruscamente no meio da pista: saia com segurança para o acostamento distante de árvores, mantenha o pisca-alerta ligado apenas se estiver completamente fora da faixa de rolamento e aguarde a passagem do núcleo mais forte.'
        ],
        checklistTitle: 'Medidas preventivas no Mato Grosso do Sul',
        checklist: [
          'Acompanhe alertas de tempestade com rajadas de vento antes de viagens longas entre Campo Grande, Dourados e Três Lagoas.',
          'Em propriedades rurais e chácaras, mantenha aceiros limpos na estação seca para barrar eventuais incêndios em pastagens.',
          'Tenha agasalhos de fácil acesso mesmo após dias quentes no outono e inverno, já que frentes frias derrubam a temperatura rapidamente.',
          'Proteja animais de estimação e rebanhos jovens nos dias de entrada brusca de massa polar.'
        ]
      },
      {
        id: 'calor-pantanal-corumba',
        heading: 'Cuidados especiais no calor do Pantanal e Bolsão',
        paragraphs: [
          'Na região de Corumbá, Aquidauana e Três Lagoas, as temperaturas máximas se mantêm muito altas durante grande parte do ano. Hidratação constante, proteção solar e atenção redobrada à qualidade do ar durante a estiagem garantem mais segurança para moradores e visitantes.'
        ],
        practicalTip:
          'Durante viagens de pesca ou turismo pelo Pantanal, leve protetor solar resistente à água, repelente, chapéu e reserva extra de água potável devido ao forte reflexo solar na água e nas estradas.'
      }
    ],
    faqs: [
      {
        question: 'Faz muito frio no Mato Grosso do Sul?',
        answer:
          'Sim. Apesar do calor predominante na maior parte do ano, fortes frentes frias entre maio e agosto provocam madrugadas próximas de 0 °C a 5 °C no sul do estado, com formação de geada.'
      },
      {
        question: 'Qual época tem mais tempestades em Campo Grande?',
        answer:
          'De outubro a março, com destaque para a transição da primavera e os meses de verão.'
      }
    ]
  },
  {
    slug: 'clima-amazonas-como-se-prevenir',
    title: 'Clima no Amazonas (AM): Cheia, Vazante, Friagem, Calor e Como se Prevenir',
    metaTitle: 'Clima no Amazonas (AM): Cheia, Calor, Friagem e Prevenção | Previsão Agora',
    metaDescription:
      'Entenda o clima equatorial do Amazonas: inverno amazônico chuvoso, verão seco, cheia dos rios, friagem e como proteger saúde e rotina em Manaus e no interior.',
    keywords: [
      'clima amazonas',
      'previsão do tempo manaus cuidados',
      'inverno amazônico o que é',
      'friagem no amazonas',
      'cheia dos rios amazonas prevenção'
    ],
    category: 'Guias por Estado',
    region: 'Norte',
    stateCode: 'AM',
    stateName: 'Amazonas',
    relatedCityId: 'am-manaus',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-18',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'No maior estado do país, o calendário não se divide em calor e frio, mas entre o inverno amazônico chuvoso e o verão mais seco. Descubra como lidar com a alta umidade, cheias fluviais, calor abafado e o fenômeno da friagem.',
    keyTakeaways: [
      'O "inverno amazônico" (dezembro a maio) concentra o maior volume de chuvas e marca a subida dos rios.',
      'Entre julho e outubro, o "verão amazônico" traz sol forte, temperaturas elevadas e risco de estiagem e fumaça.',
      'O sul e oeste do estado podem registrar quedas rápidas de temperatura durante episódios de friagem.'
    ],
    sections: [
      {
        id: 'inverno-e-verao-amazonico',
        heading: 'Entendendo o inverno e o verão amazônico',
        paragraphs: [
          'Quem visita Manaus ou o interior do Amazonas vindo de outras regiões costuma se surpreender com o vocabulário climático local. Aqui, não existe inverno frio como no Sul do Brasil: chama-se "inverno amazônico" a estação chuvosa, que vai aproximadamente de dezembro a maio, quando as chuvas frequentes amenizam ligeiramente o calor e elevam o nível dos rios da Bacia Amazônica.',
          'Já entre junho e novembro ocorre o "verão amazônico", caracterizado por menos dias de chuva, sol intenso e temperaturas máximas frequentemente entre 34 °C e 38 °C — com sensação térmica ainda maior devido à umidade vinda da floresta e dos grandes rios como Negro e Solimões.'
        ]
      },
      {
        id: 'cheia-vazante-prevencao',
        heading: 'Cheia e vazante dos rios: cuidados para saúde e mobilidade',
        paragraphs: [
          'A oscilação anual dos rios amazônicos transforma cidades e comunidades ribeirinhas. No auge da cheia (geralmente entre maio e julho em Manaus), águas avançam sobre ruas baixas, feiras e palafitas, aumentando a necessidade de prevenção contra doenças de veiculação hídrica e animais peçonhentos que buscam abrigo em locais secos.',
          'Na vazante severa (setembro a novembro), a navegação fica restrita em alguns trechos e a água armazenada sem tratamento adequado exige cuidados redobrados para consumo humano.'
        ],
        checklistTitle: 'Cuidados essenciais no clima amazônico',
        checklist: [
          'Evite contato desprotegido com água de alagamento ou enchente para prevenir leptospirose e infecções de pele.',
          'Ferva ou filtre toda água de consumo e higiene alimentar durante períodos de cheia ou seca severa.',
          'Use repelente, telas em janelas e evite acúmulo de água parada em quintais devido à alta proliferação de mosquitos no calor úmido.',
          'Mantenha ventilação constante em armários e quartos para evitar mofo rápido causado pela umidade acima de 80%.'
        ]
      },
      {
        id: 'friagem-e-calor-extremo-am',
        heading: 'Calor abafado e a surpreendente friagem no sul do Amazonas',
        paragraphs: [
          'Apesar de ser um estado equatorial, municípios do sul e sudoeste amazonense — como Lábrea, Boca do Acre, Humaitá e Tabatinga — chegam a ser atingidos por frentes frias continentais intensas entre maio e agosto, derrubando os termômetros de 34 °C para cerca de 15 °C ou 17 °C em questão de horas. Essa mudança brusca, chamada de friagem, eleva casos de resfriados e dores articulares.',
          'No restante do ano, o maior desafio é a combinação de calor elevado com umidade alta: prefira roupas folgadas, hidrate-se constantemente e proteja-se do sol forte entre 10h e 16h.'
        ],
        practicalTip:
          'Em dias de fumaça ou neblina úmida, mantenha ambientes internos frescos sem exagerar na diferença térmica do ar-condicionado — variações superiores a 10 °C entre a rua e o quarto ressecam rapidamente a garganta.'
      }
    ],
    faqs: [
      {
        question: 'Qual a época em que mais chove em Manaus?',
        answer:
          'De dezembro a maio, com pico típico entre fevereiro e abril durante o chamado inverno amazônico.'
      },
      {
        question: 'O que é a friagem no Amazonas?',
        answer:
          'É a queda repentina e temporária da temperatura causada por massas de ar polar que conseguem atravessar o continente sul-americano até o sul e oeste da Amazônia.'
      }
    ]
  },
  {
    slug: 'clima-para-como-se-prevenir',
    title: 'Clima no Pará (PA): Chuvas Diárias em Belém, Verão Amazônico e Como se Proteger',
    metaTitle: 'Clima no Pará (PA): Chuvas em Belém, Calor e Prevenção | Previsão Agora',
    metaDescription:
      'Saiba como funciona o clima no Pará: da chuva da tarde em Belém e Marajó ao período seco em Santarém e Carajás. Dicas práticas de proteção e rotina.',
    keywords: [
      'clima no pará',
      'previsão do tempo belém cuidados',
      'chuva da tarde belém',
      'clima santarém pará',
      'como se proteger do calor úmido pará'
    ],
    category: 'Guias por Estado',
    region: 'Norte',
    stateCode: 'PA',
    stateName: 'Pará',
    relatedCityId: 'pa-belem',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-19',
    updatedAt: '2026-11-20',
    readTimeMinutes: 7,
    summary:
      'No Pará, a chuva pontual que organiza o relógio de Belém convive com verões secos no sul e oeste do estado. Descubra como se prevenir de alagamentos combinados com maré alta, calor úmido e queimadas na estação seca.',
    keyTakeaways: [
      'Belém e o Nordeste paraense registram grande volume de chuva entre dezembro e maio, com trovoadas frequentes à tarde.',
      'Quando chuva forte coincide com maré alta (maré de sizígia), áreas baixas de Belém e cidades costeiras alagam mais rapidamente.',
      'O Sul e Sudeste do Pará (Marabá, Redenção, Santarém) têm estação seca definida entre julho e outubro.'
    ],
    sections: [
      {
        id: 'diversidade-paraense',
        heading: 'Clima equatorial em todo o Pará, mas com ritmos diferentes',
        paragraphs: [
          'Em Belém, Ananindeua e na Ilha do Marajó, a proximidade com a foz do Rio Amazonas e o Oceano Atlântico garante alta umidade durante todos os meses do ano. Entre dezembro e maio, o período chuvoso concentra pancadas quase diárias que chegam acompanhadas de trovões e reduzem momentaneamente o calor da tarde.',
          'Já no Oeste paraense, em Santarém e Alter do Chão, bem como no Sudeste e Sul do estado — abrangendo Marabá e Parauapebas —, o clima tropical apresenta uma janela seca muito clara no segundo semestre, favorecendo o surgimento de praias de rio e temperaturas elevadas.'
        ]
      },
      {
        id: 'mares-e-alagamentos-belem',
        heading: 'Chuva forte + maré alta: como evitar transtornos urbanos',
        paragraphs: [
          'Em cidades cortadas por igarapés e banhadas por baías sujeitas às marés atlânticas, como Belém, Abaetetuba e Bragança, a prevenção contra alagamentos depende de observar dois fatores juntos: a previsão de chuva horária e a tábua das marés. Quando uma pancada forte acontece durante a preamar (maré alta), a água da chuva encontra dificuldade para escoar.',
          'Planejar compromissos para a manhã nos meses mais chuvosos e evitar ruas baixas durante a tarde reduz drasticamente o risco de ficar preso no trânsito alagado.'
        ],
        checklistTitle: 'Medidas preventivas para o clima do Pará',
        checklist: [
          'Leve capa de chuva compacta ou guarda-chuva resistente na bolsa durante todo o primeiro semestre.',
          'Acompanhe a tábua de marés junto com a previsão de chuva se morar ou trabalhar em áreas próximas a canais e rios.',
          'No período mais seco (julho a outubro), reforce a hidratação e evite exposição solar sem proteção entre 10h e 16h.',
          'Mantenha alimentos bem vedados e utilize desumidificadores simples ou ventilação em guarda-roupas na estação chuvosa.'
        ]
      },
      {
        id: 'calor-umido-e-saude',
        heading: 'Saúde no calor úmido e nos meses secos do interior',
        paragraphs: [
          'A combinação de calor acima de 32 °C com umidade elevada exige atenção especial à pele e à hidratação: tecidos respiráveis ajudam a evitar micoses, brotoejas e desconforto térmico. No interior seco entre julho e novembro, cuidados extras contra poeira e fumaça de queimadas protegem crianças e idosos.'
        ],
        practicalTip:
          'Em dias de trovoadas fortes na Região Metropolitana de Belém, desligue aparelhos ligados à antena ou tomadas desprotegidas e aguarde o afastamento das descargas elétricas antes de circular em espaços abertos.'
      }
    ],
    faqs: [
      {
        question: 'Chove todos os dias em Belém?',
        answer:
          'Entre janeiro e maio a frequência de chuvas é quase diária, geralmente em pancadas rápidas à tarde ou à noite. Já entre julho e novembro as chuvas são bem mais esparsas.'
      },
      {
        question: 'Qual a melhor época para praias de rio em Santarém e Alter do Chão?',
        answer:
          'Entre agosto e novembro, durante a vazante e o período seco, quando os bancos de areia ficam expostos e o céu permanece mais aberto.'
      }
    ]
  },
  {
    slug: 'clima-tocantins-como-se-prevenir',
    title: 'Clima no Tocantins (TO): Calor Intenso, Seca no Cerrado e Chuvas de Verão',
    metaTitle: 'Clima no Tocantins (TO): Guia de Tempo e Prevenção | Previsão do Tempo Agora',
    metaDescription:
      'Saiba como funciona o clima no Tocantins, em Palmas, Araguaína e Gurupi. Dicas práticas para enfrentar o calor forte, o ar seco e os temporais de verão.',
    keywords: [
      'clima no tocantins',
      'previsão do tempo palmas to',
      'calor em palmas cuidados',
      'tempo seco tocantins prevenção',
      'chuvas no tocantins'
    ],
    category: 'Guias por Estado',
    region: 'Norte',
    stateCode: 'TO',
    stateName: 'Tocantins',
    relatedCityId: 'to-palmas',
    author: 'Redação Meteorológica — Previsão do Tempo Agora',
    publishedAt: '2026-10-19',
    updatedAt: '2026-11-20',
    readTimeMinutes: 6,
    summary:
      'Estado de transição entre o Cerrado e a Amazônia, o Tocantins combina um dos maiores potenciais solares do país com estação seca muito quente em Palmas e região central, além de verões chuvosos e elétricos.',
    keyTakeaways: [
      'Palmas, Gurupi e o centro-sul enfrentam temperaturas muito elevadas e baixa umidade de junho a setembro.',
      'Entre novembro e abril, as chuvas chegam com força, trazendo alívio térmico mas também risco de raios.',
      'A proteção solar e a hidratação contínua são indispensáveis durante os 12 meses do ano.'
    ],
    sections: [
      {
        id: 'duas-temporadas-to',
        heading: 'Entre o Cerrado e a Amazônia: o clima tocantinense',
        paragraphs: [
          'Localizado no encontro entre o Brasil Central e a Região Norte, o Tocantins apresenta clima tropical com temperaturas elevadas durante todo o ano e duas estações muito definidas. De outubro/novembro a abril ocorre a estação chuvosa, mais prolongada no Bico do Papagaio e em Araguaína pela proximidade com a floresta amazônica.',
          'De maio a setembro instala-se a estiagem. Em Palmas, Porto Nacional e Gurupi, o sol intenso diário empurra os termômetros para perto ou acima dos 38 °C nos meses de agosto e setembro, enquanto a umidade relativa despenca durante a tarde.'
        ]
      },
      {
        id: 'protecao-calor-palmas',
        heading: 'Como proteger a saúde no calor extremo e no tempo seco',
        paragraphs: [
          'Enfrentar semanas de calor forte e baixa umidade requer mudanças práticas na rotina familiar. A desidratação em climas quentes e secos acontece mais rápido do que se percebe porque o suor evapora instantaneamente, dando a falsa impressão de que o corpo não está perdendo água.',
          'Para quem trabalha ao ar livre ou pratica esportes na orla de Palmas e nos parques estaduais, o horário seguro concentra-se antes das 9h e após as 17h30.'
        ],
        checklistTitle: 'Checklist de proteção no Tocantins',
        checklist: [
          'Consuma no mínimo 2,5 a 3 litros de água por dia nos meses quentes e secos, ajustando conforme atividade física.',
          'Use filtro solar de amplo espectro todos os dias, além de chapéu e óculos escuros em deslocamentos a pé ou de bicicleta.',
          'Umidifique ambientes noturnos e higienize as narinas com soro fisiológico para evitar ressecamento e sangramentos.',
          'Na estação chuvosa, redobre o cuidado em praias de rio e áreas abertas ao perceber formação rápida de nuvens escuras e trovões.'
        ]
      },
      {
        id: 'queimadas-e-temporais-to',
        heading: 'Prevenção a queimadas no Jalapão e segurança nas chuvas',
        paragraphs: [
          'A preservação de áreas naturais como o Jalapão e a Ilha do Bananal depende diretamente do controle do fogo durante a estiagem. Evitar queimadas urbanas ou rurais protege tanto o ecossistema quanto a saúde respiratória de toda a população tocantinense. Já nos primeiros temporais da primavera, a transição térmica gera rajadas fortes de vento e descargas elétricas que exigem abrigo seguro.'
        ],
        practicalTip:
          'Mantenha filtros de ar-condicionado limpos antes de setembro — o uso intenso no auge do calor em Palmas exige equipamento higienizado para não espalhar fungos e poeira pelo quarto.'
      }
    ],
    faqs: [
      {
        question: 'Qual o período mais quente e seco em Palmas e no Tocantins?',
        answer:
          'Agosto e setembro concentram as maiores temperaturas e os menores índices de umidade relativa do ar em quase todo o estado.'
      },
      {
        question: 'Quando é a temporada de praias de rio no Tocantins?',
        answer:
          'Entre junho e agosto, durante a vazante dos rios Araguaia e Tocantins no período seco.'
      }
    ]
  }
];

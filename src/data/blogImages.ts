import amazoniaChuvaImg from '../assets/images/clima_amazonia_chuva_1795476901106.jpg';
import calorSolBrasilImg from '../assets/images/clima_calor_sol_brasil_1795476900346.jpg';
import casaPrevencaoImg from '../assets/images/clima_casa_prevencao_1795476902560.jpg';
import cerradoSecoImg from '../assets/images/clima_cerrado_seco_1795476901545.jpg';
import chuvaUrbanaImg from '../assets/images/clima_chuva_urbana_1795476899538.jpg';
import direcaoNeblinaImg from '../assets/images/clima_direcao_neblina_1795476906703.jpg';
import frenteFriaSerraImg from '../assets/images/clima_frente_fria_serra_1795476898483.jpg';
import litoralNordesteImg from '../assets/images/clima_litoral_nordeste_1795476900804.jpg';
import saudeHidratacaoImg from '../assets/images/clima_saude_hidratacao_1795476907130.jpg';
import tempestadeRaiosImg from '../assets/images/clima_tempestade_raios_1795476899564.jpg';

import elNinoOceanoImg from '../assets/images/tema_elnino_oceano_1795477270999.jpg';
import familiaClimaImg from '../assets/images/tema_familia_clima_1795477273832.jpg';
import granizoGeloImg from '../assets/images/tema_granizo_gelo_1795477270621.jpg';
import hortaGeadaImg from '../assets/images/tema_horta_geada_1795477273470.jpg';
import mofoVentilacaoImg from '../assets/images/tema_mofo_ventilacao_1795477271105.jpg';
import petsClimaImg from '../assets/images/tema_pets_clima_1795477271349.jpg';
import qualidadeArImg from '../assets/images/tema_qualidade_ar_1795477272068.jpg';
import radarPrevisaoImg from '../assets/images/tema_radar_previsao_1795477272251.jpg';
import respiratorioInvernoImg from '../assets/images/tema_respiratorio_inverno_1795477271704.jpg';
import vendavalVentosImg from '../assets/images/tema_vendaval_ventos_1795477270326.jpg';

import ufAcreImg from '../assets/images/uf_acre_1795477327061.jpg';
import ufAlagoasImg from '../assets/images/uf_alagoas_1795477327012.jpg';
import ufAmapaImg from '../assets/images/uf_amapa_1795477326888.jpg';
import ufCearaImg from '../assets/images/uf_ceara_1795477326862.jpg';
import ufDistritoFederalImg from '../assets/images/uf_distrito_federal_1795477274573.jpg';
import ufEspiritoSantoImg from '../assets/images/uf_espirito_santo_1795477386599.jpg';
import ufGoiasImg from '../assets/images/uf_goias_1795477275280.jpg';
import ufMaranhaoImg from '../assets/images/uf_maranhao_1795477326550.jpg';
import ufMatoGrossoImg from '../assets/images/uf_mato_grosso_1795477326971.jpg';
import ufMinasGeraisImg from '../assets/images/uf_minas_gerais_1795477274598.jpg';
import ufMatoGrossoSulImg from '../assets/images/uf_pantanal_sul_1795477327116.jpg';
import ufParaImg from '../assets/images/uf_para_1795477388043.jpg';
import ufParaibaImg from '../assets/images/uf_paraiba_1795477326722.jpg';
import ufParanaImg from '../assets/images/uf_parana_1795477327061.jpg';
import ufPernambucoImg from '../assets/images/uf_pernambuco_1795477387514.jpg';
import ufPiauiImg from '../assets/images/uf_piaui_1795477326927.jpg';
import ufRioJaneiroImg from '../assets/images/uf_rio_janeiro_1795477273844.jpg';
import ufRioSulImg from '../assets/images/uf_rio_sul_1795477326724.jpg';
import ufRnVentosImg from '../assets/images/uf_rn_ventos_1795477404290.jpg';
import ufRondoniaImg from '../assets/images/uf_rondonia_1795477386968.jpg';
import ufRoraimaImg from '../assets/images/uf_roraima_1795477326110.jpg';
import ufSantaCatarinaImg from '../assets/images/uf_santa_catarina_1795477274698.jpg';
import ufSaoPauloImg from '../assets/images/uf_sao_paulo_1795477273753.jpg';
import ufSergipeImg from '../assets/images/uf_sergipe_1795477327034.jpg';
import ufTocantinsImg from '../assets/images/uf_tocantins_1795477326807.jpg';

import { BlogArticle } from './blogTypes';

export interface ArticleImageItem {
  src: string;
  alt: string;
  caption: string;
}

export interface ArticleImagePair {
  hero: ArticleImageItem;
  secondary: ArticleImageItem;
}

interface ImageSlotConfig {
  heroSrc: string;
  heroAlt: string;
  heroCaption: string;
  secondarySrc: string;
  secondaryAlt: string;
  secondaryCaption: string;
}

const ARTICLE_IMAGE_MAP: Record<string, ImageSlotConfig> = {
  // === 18 ARTIGOS DE PREVENÇÃO, SAÚDE & FENÔMENOS ===
  'como-se-proteger-tempestades-e-raios': {
    heroSrc: tempestadeRaiosImg,
    heroAlt: 'Nuvens escuras de tempestade elétrica avançando sobre área urbana no fim da tarde',
    heroCaption: 'Formação rápida de nuvens cumulonimbus exige busca imediata por abrigo fechado antes das primeiras descargas.',
    secondarySrc: casaPrevencaoImg,
    secondaryAlt: 'Interior residencial seguro durante chuva com janelas fechadas e aparelhos protegidos',
    secondaryCaption: 'Retirar eletrônicos da tomada antes da chegada do temporal evita danos causados por surtos elétricos.'
  },
  'como-se-prevenir-enchentes-e-alagamentos': {
    heroSrc: chuvaUrbanaImg,
    heroAlt: 'Chuva intensa em avenida urbana movimentada com pedestres usando guarda-chuvas',
    heroCaption: 'Chuvas volumosas superam rapidamente a drenagem urbana; planejar rotas altas evita riscos no trajeto.',
    secondarySrc: casaPrevencaoImg,
    secondaryAlt: 'Residência organizada e protegida contra entrada de água em períodos chuvosos',
    secondaryCaption: 'Ralos limpos, válvulas de retenção e documentos protegidos em altura segura reduzem prejuízos domésticos.'
  },
  'onda-de-calor-extremo-como-se-proteger': {
    heroSrc: calorSolBrasilImg,
    heroAlt: 'Avenida brasileira ensolarada sob forte calor e céu aberto',
    heroCaption: 'Em ondas de calor intenso, o asfalto e os prédios retêm temperatura elevada até o período da noite.',
    secondarySrc: saudeHidratacaoImg,
    secondaryAlt: 'Jarra de água fresca com hortelã, chapéu e óculos escuros sob sol',
    secondaryCaption: 'Hidratação frequente e proteção física com chapéu e sombra previnem insolação e exaustão térmica.'
  },
  'frente-fria-intensa-cuidados-saude-e-casa': {
    heroSrc: frenteFriaSerraImg,
    heroAlt: 'Serra coberta por neblina fria e nuvens de massa polar ao amanhecer',
    heroCaption: 'O avanço de frentes frias provoca queda rápida dos termômetros e ventos gelados logo após a chuva.',
    secondarySrc: respiratorioInvernoImg,
    secondaryAlt: 'Xícara de chá quente ao lado de cachecol de tricô próximo à janela em manhã fria',
    secondaryCaption: 'Bebidas mornas, roupas em camadas e ambientes arejados ao sol protegem contra choques térmicos.'
  },
  'baixa-umidade-do-ar-como-amenizar-efeitos': {
    heroSrc: cerradoSecoImg,
    heroAlt: 'Vegetação seca do Brasil Central sob céu azul sem nuvens na estação de estiagem',
    heroCaption: 'Meses sem chuva reduzem a umidade relativa do ar para níveis de atenção e alerta no interior.',
    secondarySrc: saudeHidratacaoImg,
    secondaryAlt: 'Água fresca para reposição hídrica constante em dias secos',
    secondaryCaption: 'Beber água ao longo do dia e higienizar as narinas com soro fisiológico alivia o ressecamento.'
  },
  'radiacao-uv-e-protecao-solar-diaria': {
    heroSrc: saudeHidratacaoImg,
    heroAlt: 'Chapéu de aba larga, óculos UV e água fresca preparados para exposição solar segura',
    heroCaption: 'Chapéu, óculos com filtro UV e hidratação complementam o uso diário do protetor solar.',
    secondarySrc: litoralNordesteImg,
    secondaryAlt: 'Praia ensolarada com reflexão intensa da luz solar na areia e na água',
    secondaryCaption: 'Areia clara e água do mar refletem a radiação ultravioleta, exigindo reaplicação a cada duas horas.'
  },
  'vendavais-e-ventos-fortes-guia-de-seguranca': {
    heroSrc: vendavalVentosImg,
    heroAlt: 'Rajadas fortes de vento inclinando palmeiras sob nuvens carregadas na costa',
    heroCaption: 'Ventos acima de 60 km/h derrubam galhos e fiações; evite permanecer sob árvores ou estruturas metálicas.',
    secondarySrc: direcaoNeblinaImg,
    secondaryAlt: 'Rodovia com pista molhada exigindo redução de velocidade diante de rajadas laterais',
    secondaryCaption: 'Ao dirigir sob vento forte, reduza a velocidade e segure o volante com firmeza ao sair de trechos protegidos.'
  },
  'chuva-de-granizo-como-proteger-carro-e-telhado': {
    heroSrc: granizoGeloImg,
    heroAlt: 'Pedras de granizo acumuladas no asfalto ao lado de automóvel protegido em garagem coberta',
    heroCaption: 'Abrigar o veículo sob cobertura rígida ao primeiro sinal de tempestade evita amassados e quebra de vidros.',
    secondarySrc: tempestadeRaiosImg,
    secondaryAlt: 'Nuvem de tempestade severa com correntes ascendentes que favorecem formação de granizo',
    secondaryCaption: 'Nuvens muito altas e escuras com mudança brusca para vento frio antecedem episódios de granizo.'
  },
  'dirigir-na-chuva-e-neblina-direcao-defensiva': {
    heroSrc: direcaoNeblinaImg,
    heroAlt: 'Estrada sinuosa de serra com neblina densa, pista molhada e faróis acesos',
    heroCaption: 'Em serras com nevoeiro e asfalto molhado, mantenha farol baixo aceso e distância ampliada do veículo à frente.',
    secondarySrc: chuvaUrbanaImg,
    secondaryAlt: 'Trânsito urbano lento sob chuva forte exigindo atenção à aquaplanagem',
    secondaryCaption: 'Evite frear bruscamente sobre lâminas de água para não perder aderência dos pneus.'
  },
  'como-evitar-mofo-e-umidade-dentro-de-casa': {
    heroSrc: mofoVentilacaoImg,
    heroAlt: 'Ambiente claro com janelas amplamente abertas para ventilação cruzada e entrada de sol',
    heroCaption: 'Abrir janelas nos horários de sol e promover ventilação cruzada impede a proliferação de fungos nas paredes.',
    secondarySrc: casaPrevencaoImg,
    secondaryAlt: 'Sala residencial organizada com circulação de ar limpa em dia úmido',
    secondaryCaption: 'Afastar móveis alguns centímetros de paredes externas evita acúmulo de umidade oculta.'
  },
  'kit-de-emergencia-climatica-para-ter-em-casa': {
    heroSrc: casaPrevencaoImg,
    heroAlt: 'Ambiente doméstico preparado e organizado para enfrentar falta de energia ou temporais',
    heroCaption: 'Manter lanternas, power bank carregado e kit básico em local conhecido garante calma em apagões.',
    secondarySrc: chuvaUrbanaImg,
    secondaryAlt: 'Chuva intensa na cidade reforçando a importância de estar preparado antes de sair',
    secondaryCaption: 'Um kit compacto também no carro ou mochila auxilia em atrasos e desvios de trânsito durante temporais.'
  },
  'el-nino-e-la-nina-impactos-no-clima-do-brasil': {
    heroSrc: elNinoOceanoImg,
    heroAlt: 'Correntes oceânicas encontrando grandes sistemas de nuvens tropicais sobre o mar',
    heroCaption: 'O aquecimento ou resfriamento das águas do Pacífico altera os corredores de chuva em todo o Brasil.',
    secondarySrc: cerradoSecoImg,
    secondaryAlt: 'Efeito de estiagem prolongada no interior durante alterações climáticas sazonais',
    secondaryCaption: 'Monitorar as tendências sazonais ajuda produtores e famílias a se prepararem para extremos de chuva ou seca.'
  },
  'como-proteger-pets-no-calor-e-no-frio': {
    heroSrc: petsClimaImg,
    heroAlt: 'Cão descansando na sombra dentro de casa com tigela de água fresca e manta ao lado',
    heroCaption: 'Água sempre renovada, piso fresco no calor e manta protegida de correntes de vento no frio protegem os pets.',
    secondarySrc: calorSolBrasilImg,
    secondaryAlt: 'Calçada urbana sob sol intenso onde o asfalto quente pode queimar as patas dos animais',
    secondaryCaption: 'Teste o chão com a palma da mão por 5 segundos antes de passear com cães em tardes ensolaradas.'
  },
  'doencas-respiratorias-mudanca-de-tempo-prevencao': {
    heroSrc: respiratorioInvernoImg,
    heroAlt: 'Bebida quente e agasalho próximo a janela em manhã fria e úmida',
    heroCaption: 'Mudanças bruscas entre calor e frio irritam as mucosas e pedem atenção com hidratação e agasalhos.',
    secondarySrc: mofoVentilacaoImg,
    secondaryAlt: 'Quarto bem ventilado com roupas de cama expostas à luz natural',
    secondaryCaption: 'Lavar casacos guardados e manter a casa ventilada reduz crises de rinite, bronquite e alergias.'
  },
  'qualidade-do-ar-e-fumaca-de-queimadas-como-se-proteger': {
    heroSrc: qualidadeArImg,
    heroAlt: 'Horizonte brasileiro seco com céu alaranjado e névoa de fumaça atmosférica',
    heroCaption: 'Durante períodos com fumaça densa no ar, feche janelas no pico da tarde e evite exercícios ao ar livre.',
    secondarySrc: casaPrevencaoImg,
    secondaryAlt: 'Interior protegido com janelas vedadas para preservar a qualidade do ar doméstico',
    secondaryCaption: 'Manter panos úmidos ou umidificadores e beber bastante água ajuda a proteger garganta e pulmões.'
  },
  'como-ler-previsao-do-tempo-e-probabilidade-de-chuva': {
    heroSrc: radarPrevisaoImg,
    heroAlt: 'Estação meteorológica com sensores de vento e chuva sob céu com raios de sol e nuvens',
    heroCaption: 'Analisar em conjunto porcentagem de chuva, volume em milímetros e rajadas de vento torna o planejamento preciso.',
    secondarySrc: tempestadeRaiosImg,
    secondaryAlt: 'Nuvens de chuva isolada ao entardecer ilustrando precipitação localizada',
    secondaryCaption: 'Entender a previsão hora a hora ajuda a identificar janelas curtas de temporal no fim da tarde.'
  },
  'cuidados-com-idosos-e-criancas-em-extremos-climaticos': {
    heroSrc: familiaClimaImg,
    heroAlt: 'Avó e criança caminhando com chapéus e roupas leves em parque sombreado',
    heroCaption: 'Crianças e idosos são mais sensíveis ao calor e ao frio intensos e precisam de hidratação oferecida com frequência.',
    secondarySrc: saudeHidratacaoImg,
    secondaryAlt: 'Água fresca e proteção solar simples à mão para passeios em família',
    secondaryCaption: 'Preferir passeios no início da manhã e usar chapéu reduz significativamente o risco de desidratação.'
  },
  'prevencao-agricola-e-horta-domestica-geada-e-seca': {
    heroSrc: hortaGeadaImg,
    heroAlt: 'Canteiros de horta protegidos com tela agrícola sob orvalho da manhã',
    heroCaption: 'Cobertura leve com manta agrícola e cobertura morta no solo protegem folhas jovens contra geadas e insolação.',
    secondarySrc: cerradoSecoImg,
    secondaryAlt: 'Solo seco ressaltando a importância da irrigação eficiente nas horas frescas do dia',
    secondaryCaption: 'Regar no início da manhã ou fim da tarde evita evaporação rápida e fortalece as raízes.'
  },

  // === 27 GUIAS POR ESTADO ===
  'clima-sao-paulo-como-se-prevenir': {
    heroSrc: ufSaoPauloImg,
    heroAlt: 'Horizonte de São Paulo e Parque Ibirapuera sob nuvens de temporal de verão',
    heroCaption: 'Na capital e interior paulista, tardes quentes de verão frequentemente evoluem para chuvas fortes localizadas.',
    secondarySrc: chuvaUrbanaImg,
    secondaryAlt: 'Avenida paulista sob chuva intensa exigindo atenção a pontos de alagamento',
    secondaryCaption: 'Consultar a previsão hora a hora ajuda a evitar vias com histórico de enxurradas no horário de pico.'
  },
  'clima-rio-de-janeiro-como-se-prevenir': {
    heroSrc: ufRioJaneiroImg,
    heroAlt: 'Paisagem costeira do Rio de Janeiro sob sol intenso e brisa oceânica',
    heroCaption: 'Entre o calor intenso da baixada e a umidade da costa, a sensação térmica no RJ ultrapassa facilmente 40 °C.',
    secondarySrc: tempestadeRaiosImg,
    secondaryAlt: 'Nuvens densas de verão se formando sobre a serra fluminense ao fim do dia',
    secondaryCaption: 'Na Região Serrana e encostas, temporais de verão exigem monitoramento constante dos alertas da Defesa Civil.'
  },
  'clima-minas-gerais-como-se-prevenir': {
    heroSrc: ufMinasGeraisImg,
    heroAlt: 'Montanhas de Minas Gerais e cidade histórica sob nuvens carregadas de chuva',
    heroCaption: 'O relevo montanhoso mineiro cria contrastes marcantes entre manhãs frias, verões chuvosos e norte semiárido.',
    secondarySrc: direcaoNeblinaImg,
    secondaryAlt: 'Rodovia sinuosa entre serras com neblina matinal típica do clima mineiro',
    secondaryCaption: 'Nas rodovias de serra em Minas, neblina ao amanhecer e chuvas de verão pedem direção redobrada.'
  },
  'clima-espirito-santo-como-se-prevenir': {
    heroSrc: ufEspiritoSantoImg,
    heroAlt: 'Baía de Vitória e montanhas litorâneas do Espírito Santo sob céu aberto',
    heroCaption: 'O Espírito Santo combina litoral ventilado em Vitória com clima serrano ameno em Domingos Martins e Santa Teresa.',
    secondarySrc: tempestadeRaiosImg,
    secondaryAlt: 'Formação de nuvens de chuva avançando do interior para a costa capixaba',
    secondaryCaption: 'Entre novembro e janeiro, corredores de umidade aumentam o risco de chuvas contínuas nas serras e vales.'
  },
  'clima-parana-como-se-prevenir': {
    heroSrc: ufParanaImg,
    heroAlt: 'Araucárias em parque de Curitiba sob neblina fria e sol suave da manhã',
    heroCaption: 'O Paraná registra grande variação entre o frio serrano do sul/Curitiba e o calor úmido do norte e oeste.',
    secondarySrc: hortaGeadaImg,
    secondaryAlt: 'Proteção de cultivos e jardins contra geadas comuns no inverno paranaense',
    secondaryCaption: 'No inverno, massas polares trazem geadas frequentes que exigem proteção de plantas e atenção nas rodovias.'
  },
  'clima-santa-catarina-como-se-prevenir': {
    heroSrc: ufSantaCatarinaImg,
    heroAlt: 'Serra do Rio do Rastro em Santa Catarina envolta em névoa fria entre cânions verdes',
    heroCaption: 'Da serra catarinense com geada e frio rigoroso ao litoral de verão úmido, o estado muda rápido com frentes frias.',
    secondarySrc: vendavalVentosImg,
    secondaryAlt: 'Ventos costeiros intensos no litoral catarinense durante passagem de sistemas frontais',
    secondaryCaption: 'Ciclones extratropicais e frentes frias podem gerar rajadas fortes de vento e ressaca no litoral.'
  },
  'clima-rio-grande-do-sul-como-se-prevenir': {
    heroSrc: ufRioSulImg,
    heroAlt: 'Campos do Pampa no Rio Grande do Sul com nuvens de frente fria se aproximando',
    heroCaption: 'O Rio Grande do Sul é a porta de entrada das frentes frias e massas polares que transformam o tempo rapidamente.',
    secondarySrc: granizoGeloImg,
    secondaryAlt: 'Chuva de granizo associada a tempestades severas na Região Sul do Brasil',
    secondaryCaption: 'Tempestades com granizo e ventos fortes ocorrem ao longo do ano, exigindo atenção a alertas meteorológicos.'
  },
  'clima-distrito-federal-como-se-prevenir': {
    heroSrc: ufDistritoFederalImg,
    heroAlt: 'Céu amplo de Brasília no Planalto Central durante entardecer seco',
    heroCaption: 'O Distrito Federal alterna seis meses de chuva concentrada com um período seco rigoroso entre maio e setembro.',
    secondarySrc: saudeHidratacaoImg,
    secondaryAlt: 'Água fresca e proteção solar essenciais na seca do Planalto Central',
    secondaryCaption: 'Com a umidade caindo abaixo de 20% nas tardes de agosto e setembro, hidratar-se constantemente é indispensável.'
  },
  'clima-goias-como-se-prevenir': {
    heroSrc: ufGoiasImg,
    heroAlt: 'Cachoeira e chapada de Goiás sob céu limpo do Cerrado',
    heroCaption: 'Em Goiás, o contraste entre tardes ensolaradas de seca e temporais elétricos no retorno das chuvas é muito intenso.',
    secondarySrc: qualidadeArImg,
    secondaryAlt: 'Céu seco e prevenção contra fumaça e baixa umidade no Centro-Oeste',
    secondaryCaption: 'Nos meses secos de inverno, evitar queimadas e proteger as vias aéreas garante mais qualidade de vida.'
  },
  'clima-mato-grosso-como-se-prevenir': {
    heroSrc: ufMatoGrossoImg,
    heroAlt: 'Paredões da Chapada dos Guimarães em Mato Grosso iluminados pelo sol forte',
    heroCaption: 'Do calor intenso da Baixada Cuiabana à transição amazônica ao norte, Mato Grosso exige cuidado constante com o sol.',
    secondarySrc: calorSolBrasilImg,
    secondaryAlt: 'Calor urbano intenso típico das tardes em Cuiabá e cidades do interior',
    secondaryCaption: 'Evitar exposição ao sol entre 10h e 16h e priorizar roupas leves previne mal-estar térmico.'
  },
  'clima-mato-grosso-do-sul-como-se-prevenir': {
    heroSrc: ufMatoGrossoSulImg,
    heroAlt: 'Rio do Pantanal sul-mato-grossense refletindo nuvens de chuva de verão',
    heroCaption: 'Mato Grosso do Sul sente tanto ondas de calor e seca quanto quedas bruscas de temperatura por frentes frias do Sul.',
    secondarySrc: familiaClimaImg,
    secondaryAlt: 'Cuidados em família nos parques diante da alta variação térmica entre dia e noite',
    secondaryCaption: 'Ter agasalho leve e garrafa de água à mão acompanha bem a amplitude térmica sul-mato-grossense.'
  },
  'clima-amazonas-como-se-prevenir': {
    heroSrc: amazoniaChuvaImg,
    heroAlt: 'Floresta Amazônica e rios com neblina tropical após pancada de chuva quente',
    heroCaption: 'Calor constante e alta umidade alimentam chuvas diárias intensas e variações sazonais nos grandes rios do Amazonas.',
    secondarySrc: tempestadeRaiosImg,
    secondaryAlt: 'Nuvens convectivas com descargas elétricas frequentes na região amazônica',
    secondaryCaption: 'Durante chuvas com trovoadas sobre rios e igarapés, interrompa navegações em pequenas embarcações e busque abrigo.'
  },
  'clima-para-como-se-prevenir': {
    heroSrc: ufParaImg,
    heroAlt: 'Orla fluvial de Belém no Pará com barcos sob nuvens de chuva da tarde',
    heroCaption: 'Em Belém e na faixa amazônica paraense, o chamado inverno amazônico concentra chuvas fortes e diárias no primeiro semestre.',
    secondarySrc: chuvaUrbanaImg,
    secondaryAlt: 'Chuva intensa em área urbana combinada com atenção à elevação das marés',
    secondaryCaption: 'Acompanhar o horário das chuvas junto à tábua de marés ajuda a planejar deslocamentos em áreas baixas.'
  },
  'clima-tocantins-como-se-prevenir': {
    heroSrc: ufTocantinsImg,
    heroAlt: 'Dunas douradas e águas claras do Jalapão no Tocantins sob sol forte',
    heroCaption: 'O Tocantins divide o ano entre estação muito chuvosa no verão e calor seco intenso entre junho e setembro.',
    secondarySrc: qualidadeArImg,
    secondaryAlt: 'Atmosfera seca no período de estiagem exigindo atenção à qualidade do ar',
    secondaryCaption: 'Nos meses mais secos em Palmas e no interior, hidratação e cuidado com focos de incêndio são prioritários.'
  },
  'clima-acre-como-se-prevenir': {
    heroSrc: ufAcreImg,
    heroAlt: 'Curva de rio amazônico no Acre cercada por floresta com neblina matinal',
    heroCaption: 'Além das chuvas intensas do verão amazônico, o Acre vivencia a tradicional "friagem", com quedas súbitas de temperatura.',
    secondarySrc: respiratorioInvernoImg,
    secondaryAlt: 'Preparo com agasalhos e bebidas mornas para os episódios de friagem no Acre',
    secondaryCaption: 'Ter roupas de frio guardadas para as friagens entre maio e agosto evita desconfortos respiratórios.'
  },
  'clima-amapa-como-se-prevenir': {
    heroSrc: ufAmapaImg,
    heroAlt: 'Margem do estuário amazônico no Amapá sob nuvens tropicais carregadas',
    heroCaption: 'Cortado pela Linha do Equador, o Amapá mantém temperaturas estáveis e recebe grande volume de chuva entre dezembro e junho.',
    secondarySrc: chuvaUrbanaImg,
    secondaryAlt: 'Cuidados com drenagem urbana e alagamentos em dias de chuva contínua em Macapá',
    secondaryCaption: 'Limpar calhas e planejar rotas em dias de chuva coincidente com maré alta traz mais segurança em Macapá.'
  },
  'clima-rondonia-como-se-prevenir': {
    heroSrc: ufRondoniaImg,
    heroAlt: 'Rio Madeira em Rondônia refletindo nuvens cumulus ao entardecer',
    heroCaption: 'Rondônia alterna estação chuvosa úmida com período seco quente e episódios pontuais de friagem no meio do ano.',
    secondarySrc: petsClimaImg,
    secondaryAlt: 'Cuidado com hidratação da família e animais domésticos no calor seco rondoniense',
    secondaryCaption: 'Ambientes sombreados e água limpa constante ajudam pessoas e animais no trimestre mais quente.'
  },
  'clima-roraima-como-se-prevenir': {
    heroSrc: ufRoraimaImg,
    heroAlt: 'Monte Roraima acima de nuvens tropicais e savana do lavrado ao amanhecer',
    heroCaption: 'Situado quase totalmente no Hemisfério Norte, Roraima tem calendário climático próprio, com chuvas concentradas de abril a setembro.',
    secondarySrc: calorSolBrasilImg,
    secondaryAlt: 'Tardes ensolaradas e quentes na estação seca em Boa Vista',
    secondaryCaption: 'Entre dezembro e março, o tempo firme e quente em Boa Vista reforça a necessidade de proteção solar diária.'
  },
  'clima-bahia-como-se-prevenir': {
    heroSrc: litoralNordesteImg,
    heroAlt: 'Litoral da Bahia com coqueiros, mar calmo e nuvens tropicais iluminadas',
    heroCaption: 'Do litoral úmido de Salvador à Chapada Diamantina e ao sertão baiano, o estado abriga múltiplos climas simultâneos.',
    secondarySrc: chuvaUrbanaImg,
    secondaryAlt: 'Pancadas intensas em áreas urbanas exigindo atenção às encostas e drenagem',
    secondaryCaption: 'Em Salvador e Recôncavo, chuvas fortes entre abril e julho pedem atenção redobrada em áreas de encosta.'
  },
  'clima-ceara-como-se-prevenir': {
    heroSrc: ufCearaImg,
    heroAlt: 'Dunas douradas, coqueiros ao vento e mar esmeralda no litoral do Ceará',
    heroCaption: 'Com sol forte praticamente o ano todo, o Ceará concentra chuvas entre fevereiro e maio e ventos constantes no segundo semestre.',
    secondarySrc: saudeHidratacaoImg,
    secondaryAlt: 'Hidratação e chapéu essenciais para aproveitar o sol cearense com segurança',
    secondaryCaption: 'Mesmo com a brisa constante em Fortaleza e nas praias, a radiação UV permanece em níveis muito altos.'
  },
  'clima-pernambuco-como-se-prevenir': {
    heroSrc: ufPernambucoImg,
    heroAlt: 'Recifes naturais, águas claras e coqueiros no litoral de Pernambuco',
    heroCaption: 'Pernambuco vai do litoral úmido com chuvas de outono-inverno no Recife ao clima ameno do Agreste e sol intenso do Sertão.',
    secondarySrc: chuvaUrbanaImg,
    secondaryAlt: 'Cuidados na mobilidade urbana em dias de chuva persistente na Região Metropolitana do Recife',
    secondaryCaption: 'Entre maio e julho, acompanhar avisos meteorológicos evita transtornos por alagamentos no Recife.'
  },
  'clima-maranhao-como-se-prevenir': {
    heroSrc: ufMaranhaoImg,
    heroAlt: 'Dunas brancas e lagoas de água da chuva nos Lençóis Maranhenses sob céu dramático',
    heroCaption: 'Transição entre Amazônia e Nordeste, o Maranhão recebe chuvas abundantes no primeiro semestre e tempo quente e ventoso no segundo.',
    secondarySrc: vendavalVentosImg,
    secondaryAlt: 'Ventos fortes no litoral maranhense durante o período seco e ensolarado',
    secondaryCaption: 'Na temporada dos ventos entre agosto e novembro, atenção à poeira, proteção ocular e hidratação constante.'
  },
  'clima-paraiba-como-se-prevenir': {
    heroSrc: ufParaibaImg,
    heroAlt: 'Falésias do Cabo Branco na Paraíba sob a luz dourada do amanhecer atlântico',
    heroCaption: 'No ponto mais oriental das Américas, João Pessoa tem amanhecer cedo, chuvas entre abril e julho e interior semiárido seco.',
    secondarySrc: familiaClimaImg,
    secondaryAlt: 'Passeios protegidos do sol nas primeiras horas da manhã na orla e parques paraibanos',
    secondaryCaption: 'Aproveitar as primeiras horas da manhã para caminhar evita o pico de radiação UV no meio do dia.'
  },
  'clima-rio-grande-do-norte-como-se-prevenir': {
    heroSrc: ufRnVentosImg,
    heroAlt: 'Dunas costeiras e turbinas eólicas sob ventos alísios no Rio Grande do Norte',
    heroCaption: 'Conhecido pela força dos ventos alísios e elevado índice de insolação, o RN une litoral ventilado e interior quente em Mossoró.',
    secondarySrc: saudeHidratacaoImg,
    secondaryAlt: 'Reposição hídrica e óculos escuros indispensáveis sob vento constante e sol forte',
    secondaryCaption: 'A sensação de frescor causada pelo vento disfarça o calor; reaplique o protetor solar a cada duas horas.'
  },
  'clima-alagoas-como-se-prevenir': {
    heroSrc: ufAlagoasImg,
    heroAlt: 'Águas turquesas e coqueirais no litoral de Alagoas sob nuvens brancas de verão',
    heroCaption: 'Entre lagoas costeiras, Zona da Mata úmida e Sertão do São Francisco, Alagoas exige atenção às chuvas de maio a julho e ao sol do verão.',
    secondarySrc: casaPrevencaoImg,
    secondaryAlt: 'Residência protegida contra umidade e infiltração durante o inverno chuvoso em Maceió',
    secondaryCaption: 'Revisar telhados, calhas e escoamento antes de abril prepara a casa para o trimestre mais chuvoso.'
  },
  'clima-piaui-como-se-prevenir': {
    heroSrc: ufPiauiImg,
    heroAlt: 'Cânions e rochas avermelhadas da Serra da Capivara no Piauí sob sol intenso',
    heroCaption: 'Do litoral curto ao sertão e ao vale de Teresina, o Piauí enfrenta temperaturas muito altas no famoso trimestre do B-R-O Bró.',
    secondarySrc: saudeHidratacaoImg,
    secondaryAlt: 'Água fresca e proteção térmica fundamentais nos meses de maior calor em Teresina',
    secondaryCaption: 'Entre setembro e dezembro, evite atividades externas ao meio-dia e mantenha a casa fresca e hidratada.'
  },
  'clima-sergipe-como-se-prevenir': {
    heroSrc: ufSergipeImg,
    heroAlt: 'Cânions de águas verdes do Rio São Francisco em Sergipe sob luz quente',
    heroCaption: 'Do litoral ventilado de Aracaju às serras do Agreste e cânions do São Francisco, Sergipe concentra chuvas entre abril e agosto.',
    secondarySrc: vendavalVentosImg,
    secondaryAlt: 'Brisa marítima e ventos intensificados durante frentes oceânicas na orla sergipana',
    secondaryCaption: 'Monitorar marés e previsões de vento antes de passeios náuticos garante tranquilidade na orla e rios.'
  }
};

export function getArticleImages(article: BlogArticle): ArticleImagePair {
  const matched = ARTICLE_IMAGE_MAP[article.slug];
  if (matched) {
    return {
      hero: {
        src: matched.heroSrc,
        alt: matched.heroAlt,
        caption: matched.heroCaption
      },
      secondary: {
        src: matched.secondarySrc,
        alt: matched.secondaryAlt,
        caption: matched.secondaryCaption
      }
    };
  }

  return {
    hero: {
      src: tempestadeRaiosImg,
      alt: article.title,
      caption: article.summary
    },
    secondary: {
      src: casaPrevencaoImg,
      alt: `Prevenção e cuidados climáticos — ${article.title}`,
      caption: 'Medidas preventivas simples reduzem riscos diante das variações do tempo.'
    }
  };
}

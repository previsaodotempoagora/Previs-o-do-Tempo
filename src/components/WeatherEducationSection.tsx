import React, { useState } from 'react';
import {
  BookOpen,
  Sun,
  Droplets,
  Wind,
  Compass,
  AlertTriangle,
  HeartPulse,
  CloudLightning,
  ChevronDown
} from 'lucide-react';

export const WeatherEducationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'uv' | 'humidity' | 'models' | 'climate'>('uv');
  const [expandedTip, setExpandedTip] = useState<number | null>(0);

  return (
    <section className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-5 sm:p-7 space-y-6 transition-colors" id="weather-education-section">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-plum-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/60 shadow-2xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white tracking-tight">
              Guia Meteorológico, Saúde & Clima no Brasil
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
              Informações científicas para entender as variáveis do clima e cuidar do seu bem-estar
            </p>
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-stone-100 dark:bg-plum-850 p-1 rounded-xl border border-stone-200/80 dark:border-plum-800">
          <button
            onClick={() => setActiveTab('uv')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'uv'
                ? 'bg-white dark:bg-plum-800 text-brand-600 dark:text-brand-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Índice UV & Sol
          </button>

          <button
            onClick={() => setActiveTab('humidity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'humidity'
                ? 'bg-white dark:bg-plum-800 text-brand-600 dark:text-brand-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Umidade & Saúde
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'models'
                ? 'bg-white dark:bg-plum-800 text-brand-600 dark:text-brand-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Modelos de 7 e 15 Dias
          </button>

          <button
            onClick={() => setActiveTab('climate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'climate'
                ? 'bg-white dark:bg-plum-800 text-brand-600 dark:text-brand-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Climas do Brasil
          </button>
        </div>
      </div>

      {/* TAB 1: ÍNDICE UV E PROTEÇÃO SOLAR */}
      {activeTab === 'uv' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-7 space-y-3">
              <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                Como Interpretar a Radiação Ultravioleta (Índice UV)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                O <strong>Índice Ultravioleta (IUV)</strong> é uma medida internacional padrão da intensidade da radiação solar que atinge a superfície terrestre. No Brasil, por ser um país predominantemente tropical, os níveis de radiação UV frequentemente atingem patamares <strong>Muito Altos (8-10)</strong> e <strong>Extremos (11+)</strong>, especialmente entre as 10h e 16h.
              </p>

              {/* Table Guide */}
              <div className="rounded-2xl border border-stone-200 dark:border-plum-800 overflow-hidden text-xs">
                <div className="grid grid-cols-12 bg-stone-50 dark:bg-plum-850 font-bold p-2.5 border-b border-stone-200 dark:border-plum-800 text-stone-700 dark:text-stone-200">
                  <span className="col-span-3">Nível IUV</span>
                  <span className="col-span-3">Classificação</span>
                  <span className="col-span-6">Recomendações da OMS</span>
                </div>
                <div className="divide-y divide-stone-100 dark:divide-plum-800">
                  <div className="grid grid-cols-12 p-2.5 items-center">
                    <span className="col-span-3 font-bold text-emerald-600 dark:text-emerald-400">0 a 2</span>
                    <span className="col-span-3 font-semibold text-stone-700 dark:text-stone-200">Baixo</span>
                    <span className="col-span-6 text-stone-600 dark:text-stone-300">Risco mínimo. Uso de óculos de sol em dias ensolarados.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 items-center bg-stone-50/40 dark:bg-plum-850/40">
                    <span className="col-span-3 font-bold text-amber-600 dark:text-amber-400">3 a 5</span>
                    <span className="col-span-3 font-semibold text-stone-700 dark:text-stone-200">Moderado</span>
                    <span className="col-span-6 text-stone-600 dark:text-stone-300">Protetor solar FPS 30+, chapéu e permanência na sombra ao meio-dia.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 items-center">
                    <span className="col-span-3 font-bold text-orange-600 dark:text-orange-400">6 a 7</span>
                    <span className="col-span-3 font-semibold text-stone-700 dark:text-stone-200">Alto</span>
                    <span className="col-span-6 text-stone-600 dark:text-stone-300">Proteção necessária. Camisa com proteção UV e óculos escuros.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 items-center bg-stone-50/40 dark:bg-plum-850/40">
                    <span className="col-span-3 font-bold text-rose-600 dark:text-rose-400">8 a 10</span>
                    <span className="col-span-3 font-semibold text-stone-700 dark:text-stone-200">Muito Alto</span>
                    <span className="col-span-6 text-stone-600 dark:text-stone-300">Evite exposição direta entre 10h e 16h. Reaplique protetor a cada 2h.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 items-center bg-purple-50/40 dark:bg-purple-950/40">
                    <span className="col-span-3 font-bold text-purple-700 dark:text-purple-300">11+</span>
                    <span className="col-span-3 font-semibold text-purple-800 dark:text-purple-200">Extremo</span>
                    <span className="col-span-6 text-purple-900 dark:text-purple-300 font-medium">Risco severo de queimaduras e insolação. Fique abrigado.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick tips right box */}
            <div className="md:col-span-5 p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Dicas Essenciais de Fotoproteção</span>
              </div>
              <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Mesmo em dias nublados:</strong> Até 80% dos raios UV conseguem atravessar nuvens leves e neblina.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Crianças e Idosos:</strong> Possuem pele mais sensível e desidratam com maior velocidade sob calor intenso.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Hidratação Constante:</strong> Ingira pelo menos 2 litros de água fresca ao longo de dias com IUV elevado.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UMIDADE RELATIVA DO AR */}
      {activeTab === 'humidity' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-7 space-y-3">
              <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white flex items-center gap-2">
                <Droplets className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Níveis Críticos de Umidade Relativa do Ar
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Segundo a <strong>Organização Mundial da Saúde (OMS)</strong>, a faixa ideal de umidade relativa do ar para o organismo humano situa-se entre <strong>50% e 70%</strong>. Durante o período de estiagem no Brasil (especialmente nas regiões Centro-Oeste, Sudeste e interior do Nordeste), a umidade pode atingir níveis desérticos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 tracking-wider">
                    20% a 30%
                  </span>
                  <p className="font-bold text-xs text-amber-900 dark:text-amber-300">Estado de Atenção</p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300/80">
                    Evitar exercícios ao ar livre entre 11h e 15h. Umidificar ambientes fechados.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 space-y-1">
                  <span className="text-[10px] font-black uppercase text-orange-800 dark:text-orange-400 tracking-wider">
                    12% a 20%
                  </span>
                  <p className="font-bold text-xs text-orange-900 dark:text-orange-300">Estado de Alerta</p>
                  <p className="text-[11px] text-orange-800 dark:text-orange-300/80">
                    Suspender atividades físicas entre 10h e 16h. Usar soro fisiológico em olhos e narinas.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1">
                  <span className="text-[10px] font-black uppercase text-rose-800 dark:text-rose-400 tracking-wider">
                    Abaixo de 12%
                  </span>
                  <p className="font-bold text-xs text-rose-900 dark:text-rose-300">Estado de Emergência</p>
                  <p className="text-[11px] text-rose-800 dark:text-rose-300/80">
                    Interrupção de qualquer trabalho ao ar livre. Manter toalhas molhadas e baldes com água.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-900/60 space-y-2.5">
              <div className="flex items-center gap-2 text-brand-900 dark:text-brand-300 font-extrabold text-xs">
                <HeartPulse className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Recomendações Médicas para o Tempo Seco</span>
              </div>
              <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <span><strong>Lavagem Nasal:</strong> Aplicação regular de solução fisiológica 0,9% para prevenir sangramentos e rinite.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <span><strong>Alimentação Leve:</strong> Consumo de frutas ricas em água como melancia, melão, laranja e abacaxi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <span><strong>Cuidados com Queimadas:</strong> Evite qualquer queima de folhas ou lixo, que agrava drasticamente a poluição.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODELOS NUMÉRICOS DE 7 E 15 DIAS */}
      {activeTab === 'models' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-8 space-y-3">
              <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                A Ciência por Trás das Previsões de Médio e Longo Prazo
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                A previsão do tempo moderna é resultado da resolução de equações complexas de termodinâmica e mecânica dos fluidos por supercomputadores. Entenda como interpretar cada horizonte de tempo:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 flex items-start gap-3">
                  <div className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-extrabold rounded-lg shrink-0">
                    0 a 48h
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">Previsão de Altíssima Resolução (Hoje & Amanhã)</h4>
                    <p className="text-stone-600 dark:text-stone-300 mt-0.5">
                      Confiabilidade superior a 90%. Ideal para saber os horários exatos de chuva, temperaturas máximas e mínimas e direção dos ventos.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 flex items-start gap-3">
                  <div className="px-2 py-1 bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 font-extrabold rounded-lg shrink-0">
                    3 a 7 Dias
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">Previsão Sinótica de Médio Prazo</h4>
                    <p className="text-stone-600 dark:text-stone-300 mt-0.5">
                      Confiabilidade em torno de 75% a 85%. Excelente para planejar viagens de final de semana, eventos esportivos e operações agrícolas.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 flex items-start gap-3">
                  <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-extrabold rounded-lg shrink-0">
                    8 a 15 Dias
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">Tendência Atmosférica Estendida</h4>
                    <p className="text-stone-600 dark:text-stone-300 mt-0.5">
                      Caráter probabilístico e de tendência de massas de ar (frentes frias, veranicos ou bloqueios atmosféricos). Permite antecipar viradas de tempo com dias de antecedência.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 p-4 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-2">
              <h4 className="font-bold text-xs text-stone-900 dark:text-white">Dicionário Meteorológico</h4>
              <div className="text-xs space-y-2 text-stone-600 dark:text-stone-300">
                <p>
                  <strong>Sensação Térmica:</strong> Combinação da temperatura real do ar com a velocidade do vento (para o frio) ou com a umidade relativa (para o calor).
                </p>
                <p>
                  <strong>Pressão Atmosférica (hPa):</strong> Quedas rápidas de pressão costumam sinalizar a aproximação de tempestades e frentes frias.
                </p>
                <p>
                  <strong>Rajadas de Vento:</strong> Velocidade máxima instantânea atingida pelo fluxo de ar durante tempestades.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CLIMAS DO BRASIL */}
      {activeTab === 'climate' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white flex items-center gap-2">
            <CloudLightning className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            Principais Regimes Climáticos do Território Brasileiro
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Com dimensões continentais, o Brasil abriga seis grandes zonas climáticas com padrões distintos de temperatura e pluviosidade:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
              <span className="font-bold text-brand-700 dark:text-brand-400 block">Equatorial (Norte)</span>
              <p className="text-stone-600 dark:text-stone-300">
                Temperaturas elevadas o ano todo (médias acima de 25°C), alta umidade e chuvas diárias abundantes causadas pela evapotranspiração amazônica.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 block">Tropical Típico (Centro-Oeste e Sudeste)</span>
              <p className="text-stone-600 dark:text-stone-300">
                Duas estações bem marcadas: verão chuvoso e quente, e inverno seco com noites frescas.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
              <span className="font-bold text-orange-700 dark:text-orange-400 block">Semiárido (Interior do Nordeste)</span>
              <p className="text-stone-600 dark:text-stone-300">
                Altas temperaturas constantes, baixa pluviosidade anual e períodos prolongados de estiagem.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 block">Subtropical (Sul)</span>
              <p className="text-stone-600 dark:text-stone-300">
                Quatro estações bem definidas, invernos rigorosos com geadas e chuvas bem distribuídas ao longo de todo o ano.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block">Tropical Atlântico (Litoral)</span>
              <p className="text-stone-600 dark:text-stone-300">
                Influenciado pela umidade marítima e ventos alísios, com chuvas frequentes trazidas pela brisa oceânica.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
              <span className="font-bold text-purple-700 dark:text-purple-400 block">Tropical de Altitude (Serras)</span>
              <p className="text-stone-600 dark:text-stone-300">
                Temperaturas mais amenas proporcionadas pelo relevo elevado (Serras da Mantiqueira, Espinhaço e Gaúcha).
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

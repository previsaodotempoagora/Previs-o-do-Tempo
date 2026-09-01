import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'De onde vêm os dados meteorológicos da Previsão do Tempo Agora?',
    answer:
      'Nossos dados são obtidos diretamente em tempo real de modelos meteorológicos globais de alta precisão, incluindo o ECMWF (Centro Europeu de Previsões Meteorológicas de Médio Prazo), Open-Meteo, NOAA/GFS e dados de satélites geostacionários da Organização Meteorológica Mundial (WMO). Esses modelos integram observações de estações de superfície, balões atmosféricos e radares para calcular o estado da atmosfera com alta resolução espacial.'
  },
  {
    question: 'Com que frequência as informações climáticas são atualizadas?',
    answer:
      'As condições atuais (temperatura em tempo real, sensação térmica, umidade, vento e pressão) são recalculadas a cada 15 a 30 minutos. As projeções horárias e os modelos diários de 7 e 15 dias são recalculados a cada nova rodada dos supercomputadores sinóticos, normalmente 4 vezes ao dia (às 00z, 06z, 12z e 18z UTC).'
  },
  {
    question: 'Qual a diferença entre a previsão de 7 dias e a de 15 dias?',
    answer:
      'A previsão de até 7 dias possui uma taxa média de precisão superior a 80%, servindo perfeitamente para planejamento de compromissos imediatos e finais de semana. Já a previsão estendida de 15 dias tem caráter de tendência sinótica: ela prevê a movimentação de grandes massas de ar (como chegada de frentes frias ou ondas de calor), permitindo visualizar a tendência do tempo com antecedência estratégica.'
  },
  {
    question: 'Como funciona a localização automática por GPS no celular ou computador?',
    answer:
      'Ao tocar no botão de GPS, o seu navegador solicita autorização para obter as coordenadas geográficas (latitude e longitude) do seu dispositivo. Essas coordenadas são convertidas na cidade mais próxima para exibir o clima local instantaneamente. Nós não gravamos nem vendemos a sua localização, respeitando integralmente a LGPD.'
  },
  {
    question: 'O que é a Sensação Térmica e como ela difere da temperatura real?',
    answer:
      'A temperatura real é a medida termométrica do ar na sombra. Já a Sensação Térmica (Apparent Temperature) considera a perda ou ganho de calor do corpo humano, combinando o efeito da velocidade do vento (Wind Chill, que faz o ar parecer mais frio) ou da umidade relativa do ar (Heat Index, que dificulta a evaporação do suor e faz o calor parecer mais intenso).'
  },
  {
    question: 'O que indica a probabilidade de precipitação (%)?',
    answer:
      'A probabilidade de chuva expressa a chance percentual de ocorrência de pelo menos 0.1 mm de precipitação líquida na região geográfica ao longo do período selecionado. Por exemplo, 70% de chance significa que, sob aquelas condições atmosféricas, em 7 de cada 10 dias idênticos ocorre chuva.'
  },
  {
    question: 'O serviço de previsão do tempo é gratuito?',
    answer:
      'Sim, o acesso à Previsão do Tempo Agora é 100% gratuito para todos os cidadãos brasileiros, sem necessidade de cadastro ou assinaturas pagas. O portal é mantido através de parcerias de publicidade digital não invasiva em conformidade com as diretrizes do Google AdSense.'
  }
];

export const WeatherFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-5" id="weather-faq-section">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
            Perguntas Frequentes sobre a Previsão do Tempo
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Tire suas dúvidas sobre modelos meteorológicos, acurácia e funcionamento do portal
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-3 sm:py-3.5">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-3 group focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className={`text-xs sm:text-sm font-bold transition-colors ${
                  isOpen ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-600'
                }`}>
                  {item.question}
                </span>
                <div className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                  isOpen
                    ? 'bg-blue-50 border-blue-200 text-blue-600 rotate-180'
                    : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:text-slate-700'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="pt-2.5 pr-6 animate-in fade-in duration-150">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

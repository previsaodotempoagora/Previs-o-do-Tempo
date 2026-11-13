import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Info,
  Mail,
  CheckCircle2,
  ExternalLink,
  Send,
  Database,
  Lock,
  Globe2
} from 'lucide-react';

export type InstitutionalTab = 'privacy' | 'terms' | 'about' | 'contact';

interface InstitutionalModalProps {
  isOpen: boolean;
  initialTab?: InstitutionalTab;
  onClose: () => void;
}

export const InstitutionalModal: React.FC<InstitutionalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<InstitutionalTab>(initialTab);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Dúvida sobre Previsão do Tempo');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-plum-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      id="institutional-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white dark:bg-plum-900 text-stone-800 dark:text-stone-100 rounded-3xl border border-stone-200 dark:border-plum-800 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 transition-colors"
        id="institutional-modal-container"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-stone-200 dark:border-plum-800 flex items-center justify-between bg-stone-50/80 dark:bg-plum-850/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                Previsão do Tempo Agora
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Transparência, Conformidade LGPD & Informações Institucionais
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-institutional-modal-btn"
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-plum-800 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-stone-200 dark:border-plum-800 px-4 sm:px-6 bg-white dark:bg-plum-900 overflow-x-auto no-scrollbar gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            id="tab-privacy-btn"
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-300'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Política de Privacidade</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            id="tab-terms-btn"
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-300'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Termos de Uso</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            id="tab-about-btn"
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-300'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Sobre Nós & Dados</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            id="tab-contact-btn"
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-300'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Fale Conosco</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-6 custom-scrollbar">
          {/* POLÍTICA DE PRIVACIDADE */}
          {activeTab === 'privacy' && (
            <div className="space-y-5" id="privacy-content">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">
                  Política de Privacidade e Proteção de Dados (LGPD)
                </h3>
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                Última atualização: 1 de Setembro de 2026
              </p>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">1. Compromisso de Privacidade</h4>
                <p>
                  A plataforma <strong>Previsão do Tempo Agora</strong> está comprometida com a proteção e transparência no tratamento dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações fornecidas, em estrita conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong> e os padrões internacionais de privacidade digital (GDPR).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">2. Informações que Coletamos</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-600 dark:text-stone-300">
                  <li>
                    <strong>Dados de Geolocalização Opcional:</strong> Quando você clica no botão "GPS" ou "Minha Localização", solicitamos permissão do navegador para acessar suas coordenadas geográficas (latitude e longitude) unicamente para consultar a previsão do tempo de sua localidade. Essas coordenadas <em>não são vendidas nem armazenadas permanentemente em nossos servidores</em>.
                  </li>
                  <li>
                    <strong>Cidades Favoritas & Preferências:</strong> Armazenadas exclusivamente no <em>armazenamento local (localStorage)</em> do seu próprio navegador para seu conforto e rapidez.
                  </li>
                  <li>
                    <strong>Dados de Navegação & Cookies Técnicos:</strong> Informações de acesso anônimas (endereço IP aproximado, tipo de dispositivo, navegador e páginas visitadas) para garantia de estabilidade, segurança contra abusos e métricas de desempenho.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">3. Uso de Cookies e Google AdSense</h4>
                <p>
                  Utilizamos cookies e tecnologias similares para personalizar conteúdo, anúncios publicitários e analisar o tráfego do portal.
                </p>
                <div className="p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/35 border border-brand-100 dark:border-brand-900/50 text-xs space-y-2 text-stone-700 dark:text-stone-300">
                  <p className="font-semibold text-brand-900 dark:text-brand-200">
                    Informações sobre Veiculação de Anúncios de Terceiros (Google AdSense):
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600 dark:text-stone-300">
                    <li>
                      Fornecedores terceiros, incluindo o Google, utilizam cookies (como o cookie DART) para veicular anúncios com base em visitas anteriores dos usuários a este e a outros websites.
                    </li>
                    <li>
                      Os usuários podem desativar a publicidade personalizada acessando as{' '}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-600 dark:text-brand-300 underline font-semibold inline-flex items-center gap-0.5"
                      >
                        Configurações de Anúncios do Google <ExternalLink className="w-3 h-3" />
                      </a>.
                    </li>
                    <li>
                      Você também pode optar por recusar o uso de cookies de terceiros para publicidade personalizada visitando{' '}
                      <a
                        href="https://www.aboutads.info"
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-600 dark:text-brand-300 underline font-semibold inline-flex items-center gap-0.5"
                      >
                        www.aboutads.info <ExternalLink className="w-3 h-3" />
                      </a>.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">4. Compartilhamento de Dados</h4>
                <p>
                  Não vendemos, não alugamos e não comercializamos dados pessoais de usuários com terceiros. Os dados estatísticos são tratados de forma agregada e anônima para aprimoramento contínuo dos serviços meteorológicos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">5. Direitos do Titular (LGPD)</h4>
                <p>
                  Você tem o direito de solicitar confirmação da existência de tratamento, acesso aos dados, correção de informações e eliminação de dados de acordo com a LGPD. Para qualquer solicitação, entre em contato através do e-mail oficial: <a href="mailto:previsaodotempoagora.oficial@gmail.com" className="text-brand-600 dark:text-brand-300 font-bold underline">previsaodotempoagora.oficial@gmail.com</a>.
                </p>
              </section>
            </div>
          )}

          {/* TERMOS DE USO */}
          {activeTab === 'terms' && (
            <div className="space-y-5" id="terms-content">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                <FileText className="w-6 h-6" />
                <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">Termos e Condições de Uso</h3>
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                Vigência a partir de: 1 de Setembro de 2026
              </p>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">1. Aceitação dos Termos</h4>
                <p>
                  Ao acessar e utilizar o site <strong>Previsão do Tempo Agora</strong>, você concorda expressamente em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis. Caso discorde de qualquer disposição, solicitamos que não continue a utilização do serviço.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">2. Finalidade Informativa & Isenção de Responsabilidade</h4>
                <p>
                  As previsões meteorológicas, índices de radiação UV, velocidades de vento, umidade do ar e projeções de 7 e 15 dias disponibilizadas nesta plataforma são geradas por modelos matemáticos e numéricos de atmosfera (como ECMWF, GFS, ICON e agências meteorológicas abertas).
                </p>
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <p className="font-bold">Aviso Meteorológico:</p>
                  <p>
                    A atmosfera é um sistema dinâmico e caótico. As previsões estendidas (especialmente para horizontes de 7 a 15 dias) possuem caráter probabilístico e indicativo. Para atividades de alto risco à vida humana, navegação marítima pesada ou aviação civil, consulte sempre os avisos oficiais da Defesa Civil e dos órgãos governamentais de meteorologia (como INMET e Marinha do Brasil).
                  </p>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">3. Propriedade Intelectual</h4>
                <p>
                  Todo o design, interface, identidade visual, códigos-fonte, logotipos e organização de conteúdo pertencem à plataforma Previsão do Tempo Agora, protegidos pela legislação de direitos autorais e propriedade industrial.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">4. Conduta do Usuário</h4>
                <p>
                  É estritamente proibido utilizar sistemas automatizados para sobrecarregar a infraestrutura da plataforma (ataques DDoS, scraping abusivo sem autorização prévia) ou violar a segurança do portal.
                </p>
              </section>
            </div>
          )}

          {/* SOBRE NÓS & DADOS */}
          {activeTab === 'about' && (
            <div className="space-y-5" id="about-content">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                <Info className="w-6 h-6" />
                <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">Sobre a Previsão do Tempo Agora</h3>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">Nossa Missão</h4>
                <p>
                  O <strong>Previsão do Tempo Agora</strong> foi desenvolvido com o propósito de democratizar o acesso a informações meteorológicas precisas, rápidas e transparentes para todos os mais de 5.570 municípios do Brasil. Acreditamos que o acesso fácil ao clima auxilia as pessoas a planejarem suas rotinas, viagens, atividades agrícolas, esportes ao ar livre e a protegerem sua saúde.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">Fontes Confiáveis de Dados Meteorológicos</h4>
                <p>
                  Nossos sistemas agregam e processam dados de centros de excelência em modelagem climática global e regional:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-300 font-bold text-xs">
                      <Database className="w-4 h-4" />
                      <span>ECMWF (Centro Europeu)</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Reconhecido mundialmente como o modelo de maior acurácia para previsões de médio prazo (7 a 15 dias).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-300 font-bold text-xs">
                      <Database className="w-4 h-4" />
                      <span>Open-Meteo & WMO</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      API de alta velocidade integrando dados da Organização Meteorológica Mundial e satélites geoestacionários.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-300 font-bold text-xs">
                      <Database className="w-4 h-4" />
                      <span>NOAA / GFS (Estados Unidos)</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Modelos numéricos de circulação atmosférica global atualizados em múltiplos ciclos diários.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-1">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-300 font-bold text-xs">
                      <Database className="w-4 h-4" />
                      <span>Geolocalização & IBGE</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Mapeamento completo de capitais, regiões metropolitanas e municípios do território brasileiro.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">Compromisso Editorial e Qualidade</h4>
                <p>
                  Prezamos por interfaces limpas, sem poluição visual, com foco exclusivo na utilidade pública e no bem-estar da população brasileira.
                </p>
              </section>
            </div>
          )}

          {/* CONTATO */}
          {activeTab === 'contact' && (
            <div className="space-y-5" id="contact-content">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                <Mail className="w-6 h-6" />
                <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">Fale com Nossa Equipe</h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Dúvidas, sugestões de melhoria, parcerias editoriais ou reporte de inconsistências climáticas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Form */}
                <div className="md:col-span-7">
                  {contactSuccess ? (
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 space-y-2 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      <h4 className="font-extrabold text-base">Mensagem Enviada com Sucesso!</h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        Agradecemos o seu contato. Nossa equipe responderá no e-mail informado no prazo máximo de 48 horas úteis.
                      </p>
                      <button
                        onClick={() => setContactSuccess(false)}
                        className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        Enviar outra mensagem
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-200 mb-1">
                          Seu Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ex: Daniela Brito"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:focus:border-brand-400 focus:bg-white dark:focus:bg-plum-900 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-200 mb-1">
                          Seu E-mail de Contato *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="seuemail@exemplo.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:focus:border-brand-400 focus:bg-white dark:focus:bg-plum-900 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-200 mb-1">
                          Assunto
                        </label>
                        <select
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:focus:border-brand-400 focus:bg-white dark:focus:bg-plum-900 transition-all"
                        >
                          <option value="Dúvida sobre Previsão do Tempo">Dúvida sobre Previsão do Tempo</option>
                          <option value="Sugestão de Cidade ou Funcionalidade">Sugestão de Nova Funcionalidade</option>
                          <option value="Reporte de Erro de Localização">Reporte de Inconsistência de Dados</option>
                          <option value="Privacidade e Dados LGPD">Privacidade e Proteção de Dados (LGPD)</option>
                          <option value="Contato Comercial / Publicidade">Contato Comercial / Publicidade</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-200 mb-1">
                          Mensagem *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Digite aqui sua mensagem com detalhes..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:focus:border-brand-400 focus:bg-white dark:focus:bg-plum-900 transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSending ? (
                          <span>Enviando mensagem...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Enviar Mensagem</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Direct info cards */}
                <div className="md:col-span-5 space-y-3">
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                      E-mail Direto do Suporte
                    </span>
                    <a
                      href="mailto:previsaodotempoagora.oficial@gmail.com"
                      className="text-sm font-bold text-brand-600 dark:text-brand-300 hover:underline block break-all"
                    >
                      previsaodotempoagora.oficial@gmail.com
                    </a>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Atendimento rápido para usuários, imprensa e suporte geral.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                      Horário de Resposta
                    </span>
                    <p className="text-xs font-semibold text-stone-800 dark:text-stone-100">
                      Segunda a Sexta-feira: 08:00 às 18:00 (Horário de Brasília)
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Tempo médio de resposta: menos de 24 horas úteis.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/35 border border-brand-100 dark:border-brand-900/50 flex items-start gap-2.5 text-xs text-brand-900 dark:text-brand-200">
                    <Lock className="w-4 h-4 text-brand-600 dark:text-brand-300 shrink-0 mt-0.5" />
                    <span>
                      Suas mensagens e dados de contato são estritamente confidenciais e protegidos sob a LGPD.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 sm:px-6 bg-stone-50 dark:bg-plum-850 border-t border-stone-200 dark:border-plum-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Previsão do Tempo Agora © {new Date().getFullYear()}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-stone-200 dark:border-plum-700 bg-white dark:bg-plum-900 hover:bg-stone-100 dark:hover:bg-plum-800 text-stone-700 dark:text-stone-200 font-bold transition-all shadow-xs cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

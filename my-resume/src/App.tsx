import { 
  Mail, Phone, MapPin, ExternalLink, 
  Award, Download, 
  Brain, Database, Server, GitBranch, Terminal, Layers
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

// --- ДАННЫЕ ---

// 1. Radar Chart (Профиль)
// Уменьшили названия, чтобы они влезали
const radarData = [
  { subject: 'ML / AI', A: 95, fullMark: 100 },
  { subject: 'Math', A: 90, fullMark: 100 },
  { subject: 'Back', A: 75, fullMark: 100 },
  { subject: 'DevOps', A: 60, fullMark: 100 },
  { subject: 'Front', A: 40, fullMark: 100 }, // React Basics
  { subject: 'Soft', A: 85, fullMark: 100 },
];

// 2. Данные для линейных прогресс-баров (Вместо BarChart, который глючит с текстом)
const skillsList = [
  { name: 'Python Ecosystem (PyTorch, Pandas)', level: 95, color: 'bg-blue-600' },
  { name: 'SQL (Postgres + pgvector) & NoSQL', level: 80, color: 'bg-indigo-600' },
  { name: 'Backend (FastAPI, Kafka)', level: 70, color: 'bg-violet-600' },
  { name: 'DevOps (Docker, CI/CD basics)', level: 60, color: 'bg-slate-600' },
  { name: 'Frontend (React, Tailwind)', level: 40, color: 'bg-emerald-500' },
];

function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-10 print:bg-white print:pb-0">
      
      {/* Кнопка печати */}
      <div className="fixed bottom-5 right-5 no-print z-50">
        <button 
          onClick={handlePrint}
          className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-105 transition flex items-center gap-2 font-bold cursor-pointer border border-slate-700"
        >
          <Download size={20} /> Save PDF
        </button>
      </div>

      {/* ЛИСТ А4 */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl p-10 md:p-12 print:shadow-none print:p-0 print:max-w-full min-h-[297mm]">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8 relative">
          {/* Декоративный фон для хедера */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="relative z-10">
            <h1 className="text-[3.5rem] leading-none font-black text-slate-900 tracking-tighter uppercase mb-2">
              Stepan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Shepilov</span>
            </h1>
            <div className="flex items-center gap-3 text-xl font-medium text-slate-600 mt-3">
              <span className="flex items-center gap-1"><Brain size={20} className="text-blue-600"/> Data Scientist</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Server size={20} className="text-indigo-600"/> ML Engineer</span>
            </div>
          </div>
          
          <div className="text-right text-sm space-y-2 text-slate-600 font-medium relative z-10">
            <ContactItem text="Tomsk, Russia" icon={<MapPin size={15} />} />
            <ContactItem text="+7 (913) 110-72-43" icon={<Phone size={15} />} href="tel:+79131107243" />
            <ContactItem text="stepanshepilovwork@gmail.com" icon={<Mail size={15} />} href="mailto:stepanshepilovwork@gmail.com" />
            <ContactItem text="https://github.com/stepanshepilov" icon={<ExternalLink size={15} />} />
          </div>
        </header>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-12 gap-10 mb-8">
          
          {/* ЛЕВАЯ КОЛОНКА (Текст) */}
          <div className="col-span-7 space-y-8">
            
            {/* Summary */}
            <section>
              <SectionTitle title="Profile Summary" />
              <p className="text-[0.92rem] leading-relaxed text-slate-700 text-justify">
                R&D-focused Data Scientist combining a strong academic background in <strong>Applied Math</strong> with modern engineering practices. 
                Specializing in <strong>GNNs, LLMs, and Knowledge Graphs</strong>. 
                Recently expanded skillset to include <strong>Backend (FastAPI, Kafka)</strong> and <strong>DevOps (Docker)</strong> to build end-to-end ML pipelines independently.
              </p>
            </section>

            {/* Education */}
            <section>
              <SectionTitle title="Education" />
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                   <Layers size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Tomsk State University</div>
                  <div className="text-sm text-slate-600 font-medium">Applied Mathematics & Computer Science (2023-2027)</div>
                  <div className="text-xs text-slate-500 mt-1 bg-slate-50 inline-block px-2 py-1 rounded border border-slate-100">
                    Major: Fundamental Informatics • Leader of IT Science Club
                  </div>
                </div>
              </div>
            </section>

             {/* Tech Stack Pills (Цветные) */}
            <section>
              <SectionTitle title="Core Tech Stack" />
              <div className="flex flex-wrap gap-2">
                <TechPill label="PyTorch" type="ml" />
                <TechPill label="LangChain" type="ml" />
                <TechPill label="GraphRAG" type="ml" />
                <TechPill label="FastAPI" type="backend" />
                <TechPill label="Apache Kafka" type="backend" />
                <TechPill label="PostgreSQL" type="backend" />
                <TechPill label="Docker" type="devops" />
                <TechPill label="React" type="frontend" />
                <TechPill label="Git" type="devops" />
              </div>
            </section>
          </div>

          {/* ПРАВАЯ КОЛОНКА (Графики) */}
          <div className="col-span-5 flex flex-col gap-6">
             
             {/* RADAR CHART */}
             <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Skill Balance</div>
                <div className="w-full h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                      <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} 
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Stepan"
                        dataKey="A"
                        stroke="#2563eb"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        isAnimationActive={false} 
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* CUSTOM SKILL BARS (Замена BarChart) */}
             <div className="space-y-3">
                {skillsList.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${skill.color}`} 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
             </div>

          </div>
        </div>

        {/* --- TIMELINE SECTION --- */}
        <section className="mt-10">
          <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3 mb-8">
             <GitBranch className="text-blue-600" size={24} />
             <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">Professional Experience</h2>
          </div>

          <div className="relative ml-3 space-y-0">
            {/* Линия таймлайна (Dashed для стиля) */}
            <div className="absolute top-3 bottom-0 left-[19px] w-[2px] bg-slate-200"></div>

            {/* JOB 1 */}
            <TimelineBlock 
              date="July 2025 — Present"
              role="Junior Data Scientist"
              company="Gazpromneft-Digital Solutions"
              tags={['Kafka', 'Docker', 'SQLAlchemy', 'PgVector']}
              icon={<Terminal size={16} className="text-white" />}
              active
            >
              <p className="mb-2">Leading the development of PoCs for intelligent system components.</p>
              <ul className="list-disc ml-4 space-y-1.5 text-slate-600">
                <li>Implemented multiple <strong>Proof-of-Concepts</strong> to validate R&D hypotheses.</li>
                <li>Full migration of local services to <strong>Docker Compose</strong> environment.</li>
                <li>Integrated <strong>Apache Kafka</strong> to enable asynchronous data streaming between services.</li>
                <li>Designed efficient vector storage architecture using <strong>pgvector</strong>.</li>
              </ul>
            </TimelineBlock>

            {/* JOB 2 */}
            <TimelineBlock 
              date="Apr 2025 — June 2025"
              role="Junior Data Scientist (Product)"
              company="Gazpromneft-Digital Solutions"
              tags={['FastAPI', 'LLM', 'OCR', 'Algorithms']}
              icon={<Brain size={16} className="text-white" />}
            >
               <p className="mb-2">Focused on algorithmic core optimization.</p>
               <ul className="list-disc ml-4 space-y-1.5 text-slate-600">
                <li>Developed metadata collection algorithm boosting GNN accuracy by <strong>20%</strong>.</li>
                <li>
                  Built an end-to-end pipeline: 
                  <span className="italic text-slate-500"> RegExp/OCR Parsing → LLM Field Generation → Graph Node Creation</span>.
                </li>
                <li>Research: "LLM capabilities in generating symbolic calculation languages".</li>
              </ul>
            </TimelineBlock>

            {/* JOB 3 */}
            <TimelineBlock 
              date="Dec 2024 — Apr 2025"
              role="Trainee Data Scientist"
              company="Gazpromneft-Digital Solutions"
              tags={['GraphRAG', 'ChromaDB', 'Python']}
              icon={<Database size={16} className="text-white" />}
            >
               <ul className="list-disc ml-4 space-y-1.5 text-slate-600">
                <li>Built the entire <strong>GraphRAG</strong> (Knowledge Graph) codebase from zero.</li>
                <li>Implemented text preprocessing pipelines and <strong>ChromaDB</strong> vector search.</li>
                <li>Refactored legacy codebases and participated in R&D team meetups.</li>
              </ul>
            </TimelineBlock>
          </div>
        </section>

        {/* --- ACHIEVEMENTS FOOTER --- */}
        {/* break-inside-avoid гарантирует, что блок не разорвется при печати */}
        <section className="mt-10 grid grid-cols-2 gap-6 break-inside-avoid">
            <AchievementCard 
              title="Hackathon Winner" 
              subtitle="1st Place @ UNOVUS 2025"
              desc="MTS Track: Local Weather Forecast. Led the team to victory. Also Finalist of Digital Breakthrough AI 2024."
            />
            <AchievementCard 
              title="Science Publication" 
              subtitle="Conference Award Winner"
              desc='"From Text to Computations: Generating Computational Graphs from Scientific Knowledge Sources".'
            />
        </section>
        
        <footer className="mt-12 border-t border-slate-100 pt-4 text-center text-slate-400 text-xs">
          Created with React, Tailwind CSS & Recharts
        </footer>

      </div>
    </div>
  );
}

// --- КОМПОНЕНТЫ ---

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-sm font-bold uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
    {title}
    <span className="h-[1px] flex-grow bg-slate-100"></span>
  </h2>
);

const ContactItem = ({ text, icon, href }: { text: string, icon: any, href?: string }) => (
  <div className="flex items-center justify-end gap-2 group">
    {href ? (
      <a href={href} className="group-hover:text-blue-600 transition font-semibold">{text}</a>
    ) : (
      <span className="font-semibold">{text}</span>
    )}
    <span className="text-slate-400 group-hover:text-blue-600 transition">{icon}</span>
  </div>
);

const TechPill = ({ label, type }: { label: string, type: 'ml' | 'backend' | 'devops' | 'frontend' }) => {
  const styles = {
    ml: 'bg-blue-50 text-blue-700 border-blue-100',
    backend: 'bg-violet-50 text-violet-700 border-violet-100',
    devops: 'bg-slate-100 text-slate-700 border-slate-200',
    frontend: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  };
  
  return (
    <span className={`px-3 py-1 rounded-md border text-xs font-bold shadow-sm ${styles[type]}`}>
      {label}
    </span>
  );
};

const TimelineBlock = ({ date, role, company, tags, children, icon, active = false }: any) => (
  <div className="relative pl-12 pb-10 break-inside-avoid">
    {/* Иконка на линии */}
    <div className={`absolute left-0 top-1 w-10 h-10 rounded-xl flex items-center justify-center z-10 ring-4 ring-white shadow-sm transition-colors duration-300 ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
      {icon}
    </div>
    
    {/* Контент */}
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${active ? 'bg-blue-50/30 border-blue-100 shadow-sm' : 'bg-white border-slate-100'}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{role}</h3>
          <div className="text-sm font-semibold text-slate-500">{company}</div>
        </div>
        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded tracking-wider ${active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
          {date}
        </span>
      </div>
      
      <div className="text-sm text-slate-700 mb-4 leading-relaxed">
        {children}
      </div>

      {/* Тэги технологий */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100/50">
        {tags.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const AchievementCard = ({ title, subtitle, desc }: any) => (
  <div className="bg-slate-900 text-slate-50 p-6 rounded-2xl relative overflow-hidden shadow-lg group">
    <div className="relative z-10 flex items-start gap-4">
      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
        <Award className="text-yellow-400" size={28} />
      </div>
      <div>
        <h3 className="font-bold text-lg tracking-tight">{title}</h3>
        <div className="text-blue-400 text-sm font-bold mb-2 uppercase tracking-wider">{subtitle}</div>
        <p className="text-xs text-slate-300 leading-relaxed opacity-90">{desc}</p>
      </div>
    </div>
    {/* Декор фона */}
    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
  </div>
);

export default App;
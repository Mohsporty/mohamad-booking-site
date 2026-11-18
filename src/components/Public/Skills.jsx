import React from 'react';
import { Code2, Cpu, Database, CloudCog, ShieldCheck, GitBranch } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      category: 'الحوسبة السحابية والبنية التحتية',
      icon: CloudCog,
      skills: ['AWS (EKS, Lambda, RDS, IAM)', 'Microsoft Azure', 'Google Cloud Platform', 'Terraform (IaC)', 'Kubernetes & Docker', 'Multi-Region High Availability'],
    },
    {
      category: 'الأنماط المعمارية والتكامل',
      icon: Cpu,
      skills: ['Microservices Architecture', 'Event-Driven Architecture (EDA)', 'Apache Kafka & RabbitMQ', 'RESTful & GraphQL API Design', 'CQRS & Event Sourcing', 'Domain-Driven Design (DDD)'],
    },
    {
      category: 'البيانات والأداء',
      icon: Database,
      skills: ['Distributed Databases (PostgreSQL, MongoDB)', 'Redis Distributed Caching', 'Data Lakehouse Architecture', 'BigQuery Analytics', 'Query Optimization', 'Disaster Recovery (RTO/RPO)'],
    },
    {
      category: 'الأمن، الحوكمة والأطر المؤسسية',
      icon: ShieldCheck,
      skills: ['TOGAF Framework', 'Zero Trust Architecture', 'PCI-DSS & ISO 27001 Compliance', 'Cloud Security Posture (CSPM)', 'FinOps Cloud Cost Optimization', 'Disaster Recovery Planning'],
    },
  ];

  return (
    <section id="skills" className="py-16 border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-data font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
            الخبرات والأدوات
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mb-3">
            المنظومة التقنية والمعمارية
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            التقنيات والأطر المعمارية المعتمدة التي أستخدمها في تصميم وتوجيه المشاريع المعقدة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {cat.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono-data bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

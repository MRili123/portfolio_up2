import { Code2, Rocket, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: Code2,
      title: t('about.cleanCode'),
      description: t('about.cleanCodeDesc')
    },
    {
      icon: Rocket,
      title: t('about.fastDelivery'),
      description: t('about.fastDeliveryDesc')
    },
    {
      icon: Users,
      title: t('about.collaboration'),
      description: t('about.collaborationDesc')
    }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t('about.title')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Developer workspace"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                {t('about.heading')}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                {t('about.paragraph1')}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                {t('about.paragraph2')}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t('about.paragraph3')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

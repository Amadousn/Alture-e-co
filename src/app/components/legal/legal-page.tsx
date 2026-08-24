type LegalSection = {
    heading: string;
    body: string[];
};

type LegalPageProps = {
    title: string;
    sections: LegalSection[];
};

const LegalPage = ({ title, sections }: LegalPageProps) => {
    return (
        <section className="relative bg-black overflow-hidden pt-32 pb-20 md:pb-28">
            <div className="container mx-auto max-w-3xl relative z-10 px-4 md:px-6">
                <h1 className="text-2xl md:text-3xl font-light text-white mb-12 md:mb-16">
                    {title}
                </h1>

                <div className="space-y-10 md:space-y-12">
                    {sections.map((section) => (
                        <div key={section.heading}>
                            <h2 className="text-sm md:text-base font-medium text-primary tracking-wide mb-3">
                                {section.heading}
                            </h2>
                            {section.body.map((paragraph, i) => (
                                <p
                                    key={i}
                                    className="text-gray-400 font-light leading-relaxed text-sm md:text-base mt-2 first:mt-0"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LegalPage;


import { resumeData } from '@/data/resume';
import { Code2, Terminal, Shield, BrainCircuit } from 'lucide-react';

export function AboutMe() {
    return (
        <section id="about" className="py-24 bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-12">
                    About <span className="text-blue-500">Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Objective & Experience */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-4">The Journey</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {resumeData.objective}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-6">Experience</h3>
                            {resumeData.experience.map((exp, idx) => (
                                <div key={idx} className="bg-black/50 p-6 rounded-2xl border border-gray-800">
                                    <h4 className="text-xl font-medium text-blue-400">{exp.role}</h4>
                                    <p className="text-gray-400 mt-4 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-6">Technical Arsenal</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Languages */}
                            <div className="bg-black/30 p-6 rounded-2xl border border-gray-800/50 hover:border-blue-500/50 transition-colors">
                                <Code2 className="text-blue-500 mb-4" size={32} />
                                <h4 className="text-lg font-medium text-white mb-3">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.languages.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Web Tech */}
                            <div className="bg-black/30 p-6 rounded-2xl border border-gray-800/50 hover:border-emerald-500/50 transition-colors">
                                <Terminal className="text-emerald-500 mb-4" size={32} />
                                <h4 className="text-lg font-medium text-white mb-3">Web Tech</h4>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.webTech.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Cybersecurity */}
                            <div className="bg-black/30 p-6 rounded-2xl border border-gray-800/50 hover:border-red-500/50 transition-colors">
                                <Shield className="text-red-500 mb-4" size={32} />
                                <h4 className="text-lg font-medium text-white mb-3">Security</h4>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.cybersecurity.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Other Tools / DB */}
                            <div className="bg-black/30 p-6 rounded-2xl border border-gray-800/50 hover:border-purple-500/50 transition-colors">
                                <BrainCircuit className="text-purple-500 mb-4" size={32} />
                                <h4 className="text-lg font-medium text-white mb-3">Tools & DB</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[...resumeData.skills.designTools, ...resumeData.skills.databases].map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

export default function Contact() {
  return (
    <section className="py-32 bg-porsche-gray relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Experience It Yourself</h2>
          <div className="w-16 h-1 bg-porsche-red mt-6 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 bg-porsche-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-6xl mx-auto">
          
          <div className="w-full lg:w-1/2 p-10 md:p-16 z-10 relative">
            <h3 className="text-2xl font-bold text-white mb-8">Request Contact</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-porsche-red transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-porsche-red transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Phone</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-porsche-red transition-colors" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Model of Interest</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-porsche-red transition-colors appearance-none">
                  <option className="bg-porsche-black">911 Turbo S</option>
                  <option className="bg-porsche-black">911 GT3 RS</option>
                  <option className="bg-porsche-black">Taycan Turbo GT</option>
                  <option className="bg-porsche-black">Cayenne Turbo GT</option>
                  <option className="bg-porsche-black">Panamera Turbo E-Hybrid</option>
                  <option className="bg-porsche-black">Macan Electric Turbo</option>
                </select>
              </div>
              <button type="button" className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest mt-4">
                Submit Request
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-white/5">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full border border-porsche-red/50 flex items-center justify-center mb-6 animate-pulse">
                <div className="w-3 h-3 bg-porsche-red rounded-full"></div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Porsche Experience Center</h4>
              <p className="text-gray-400">Find your nearest official dealer or experience center.</p>
              <button className="mt-8 px-6 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors">
                Open Map
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// app/page.jsx (Home Page - Surprise Box)
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <motion.div
        className="text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.img
          src="/gift-box.png"
          alt="Surprise Gift"
          className="w-40 mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => router.push('/celebration')}
          whileTap={{ scale: 0.95 }}
        />
        <h1 className="text-2xl font-bold text-pink-600">Tap the gift to reveal your surprise, Diksha! 🎁</h1>
      </motion.div>
    </main>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function Celebration() {
  const { width, height } = useWindowSize();
  const [showCard, setShowCard] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [showConfettiBurst, setShowConfettiBurst] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const audioRef = useRef(null);
  const answerRef = useRef(null);
  const photoRef = useRef(null);

  const photos = [
    'photos/photo1.jpg', 'photos/photo2.jpg', 'photos/photo3.jpg',
    'photos/photo4.jpg', 'photos/photo5.jpg', 'photos/photo6.jpg', 'photos/photo7.jpg'
  ];

  const questions = [
    {
      q: 'Would you still talk to me if I turned into a ghost💀?',
      options: {
        Yes: 'Awwwwwww 🥺',
        No: '😢😔😔😔',
        'Gnd mardungi': '😰😰😰😰'
      }
    },
    {
      q: 'Conjuring 4 dekhegi?',
      options: {
        Yes: 'Yesss 🎬👻',
        'definitely yes': 'Mastttt 😏'
      }
    },
    {
      q: 'Fuddu h n tu?',
      options: {
        Yes: '🤣😂 Glad we agree!',
        obviously: '🤣😂 Of course!'
      }
    }
  ];

  const handleAnswer = (response) => {
    setAnswers((prev) => [...prev, response]);
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        setShowPhotos(true);
      }
    }, 3000);
  };

  const handleNextPhoto = () => {
    if (imageIndex < photos.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else {
      setShowFinalMessage(true);
    }

    setTimeout(() => {
      photoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    if (cakeCut) {
      setShowConfettiBurst(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
      setTimeout(() => setShowConfettiBurst(false), 3000);
    }
  }, [cakeCut]);

  useEffect(() => {
    if (showAnswer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showAnswer]);

  return (
    <main className="min-h-screen bg-pink-50 py-10 px-4 text-gray-800 relative overflow-x-hidden">
      <ReactConfetti width={width} height={height} recycle={false} numberOfPieces={300} />
      {showConfettiBurst && <ReactConfetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      <audio ref={audioRef} src="/celebration-sound.mp3" preload="auto" />

      {/* Card Reveal */}
      {!showCard && (
        <motion.div
          className="max-w-md mx-auto text-center bg-gradient-to-tr from-pink-400 to-purple-500 text-white p-8 rounded-3xl shadow-[0_0_30px_rgba(255,105,180,0.6)] cursor-pointer"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCard(true)}
        >
          <h2 className="text-2xl font-extrabold mb-2 tracking-wide">🎁 Tap to open your surprise card 🎁</h2>
        </motion.div>
      )}

      {showCard && (
        <motion.div
          className="max-w-3xl mx-auto bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-10 rounded-[40px] shadow-[0_20px_60px_rgba(255,105,180,0.4)] mt-10 border border-pink-300"
          initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-center text-lg md:text-xl font-medium leading-relaxed text-pink-800">
            <span className="text-3xl">🎉</span> <br />
            <span className="font-bold text-2xl">Gunnu bdmos!</span> Another year older… but don’t worry, you still act like a child and I still love you for it 😜<br /><br />
            Thank you for being my chaos, my therapist, my bokachoda, and the one who always just gets me.<br /><br />
            Without talking to u even a single day feels like a gap. I really wish tu hamesha khush rahe, and agar nahi rhti to I am naaa 🤧.<br /><br />
            You deserve all the love, happiness, and care this world has to offer. 🍰💖<br /><br />
            Love you forever, idiot.<br />
            <span className="block mt-4 italic">~ Your one and only, ride-or-die 💖 — Vikesh</span>
          </p>
        </motion.div>
      )}

      {/* Quiz Section */}
      {showCard && !showPhotos && (
        <div className="mt-12 text-center max-w-xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">{questions[questionIndex].q}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(questions[questionIndex].options).map(([opt, response]) => (
              <button
                key={opt}
                onClick={() => handleAnswer(response)}
                className="px-4 py-2 bg-yellow-300 rounded-full hover:bg-yellow-400 transition"
              >
                {opt}
              </button>
            ))}
          </div>
          <AnimatePresence>
            {showAnswer && (
              <motion.div
                ref={answerRef}
                className="mt-6 p-4 bg-white border border-gray-300 rounded-xl shadow text-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {answers[questionIndex]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Photo Slider */}
      {showCard && showPhotos && !showFinalMessage && (
        <div className="mt-12 text-center" ref={photoRef}>
          <motion.h2
            className="text-3xl font-bold text-pink-700 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Looks whose b'day is today... ohh this cutieee 😍
          </motion.h2>
          <motion.img
            key={photos[imageIndex]}
            src={photos[imageIndex]}
            alt="Memories"
            className="mx-auto rounded-xl shadow-xl w-full max-w-md h-auto object-contain sm:max-h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="mt-4 flex justify-center gap-8">
            <button onClick={handleNextPhoto} className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600">
              {imageIndex < photos.length - 1 ? 'Next ➡️' : 'Final Surprise 🎁'}
            </button>
          </div>
        </div>
      )}

      {/* Final Message */}
      {showFinalMessage && (
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto p-6 bg-purple-100 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-3xl font-bold mb-4 text-pink-700">And that’s a wrap! 🎁</h3>
          <p className="text-lg text-pink-800">
            Every moment with you is a memory worth cherishing. Hope this little surprise made you smile 💜<br /><br />
            Happy Birthday once again, Gunnu! 🎂🥳<br /><br />
            Now scroll down and cut the cake 🎂✨
          </p>
        </motion.div>
      )}

      {/* Cake Cutting */}
      {showFinalMessage && (
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">🎂 Ready to cut the cake?</h3>
          {!cakeCut ? (
            <motion.div
              className="relative w-60 mx-auto cursor-pointer"
              whileTap={{ scale: 0.95 }}
              onClick={() => setCakeCut(true)}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, -5, 5, -5, 0] }}
              transition={{ duration: 1 }}
            >
              <img src="/cake-with-candle.png" alt="Cake" className="w-full" />
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [-5, 0, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎂✨ Tap to Cut!
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img src="/cake-cut.png" alt="Cake Cut" className="w-60" />
              <p className="mt-4 text-lg">Yay! Cake has been cut! 🎉🍰</p>
              <p className="mt-2 text-lg">Enjoy your special day Pookieeeeee💗</p>
            </motion.div>
          )}
        </div>
      )}
    </main>
  );
}

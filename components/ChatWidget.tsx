// @ts-nocheck
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Bot, User, Minimize2 } from 'lucide-react'
import { useChat, Message } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const { messages, sendMessage, status } = useChat()
  const isLoading = status === 'submitted' || status === 'streaming'

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    sendMessage({ text: inputValue })
    setInputValue('')
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/* Chat Button (Bottom Left) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.7 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#141414] border border-emerald-500/30 text-emerald-400 shadow-2xl shadow-emerald-500/20 hover:bg-emerald-500/10 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#141414] border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((m: Message) => (
                <div key={m.id} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-emerald-500 text-black' : 'bg-[#1a1a1a] border border-white/10 text-emerald-400'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-emerald-500 text-black rounded-tr-sm' : 'bg-[#141414] border border-white/5 text-white/80 rounded-tl-sm'}`}>
                    {m.parts?.map((part, i) => (
                      part.type === 'text' ? (
                        <div key={i} className="text-sm">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                              li: ({ node, ...props }) => <li className="" {...props} />,
                              a: ({ node, ...props }) => <a className="underline hover:opacity-80" {...props} />
                            }}
                          >
                            {part.text}
                          </ReactMarkdown>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#1a1a1a] border border-white/10 text-emerald-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#141414] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#141414] border-t border-white/5">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ketik pertanyaan Anda..."
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 p-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

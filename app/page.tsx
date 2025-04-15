"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Diagnóstico Empresarial
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Um processo estruturado para identificar oportunidades de crescimento para o seu negócio
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Bem-vindo ao Diagnóstico</CardTitle>
            <CardDescription className="text-teal-50">
              Este processo é dividido em 3 etapas para maximizar a eficácia da nossa análise
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <span className="font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Formulário Pré-Call</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Colete informações essenciais sobre sua empresa antes da nossa reunião. Isso nos ajuda a focar no
                    que realmente importa durante a call.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <span className="font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Diagnóstico</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Uma conversa estruturada para aprofundar nos pontos críticos do seu negócio e identificar
                    causas-raiz dos desafios atuais.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <span className="font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Organograma e Estrutura</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Visualize a estrutura ideal para sua empresa, com papéis, responsabilidades e KPIs claramente
                    definidos.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/pre-call">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  >
                    Iniciar Diagnóstico
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

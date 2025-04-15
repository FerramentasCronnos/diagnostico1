"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  estrategia: {
    objetivos: string
    metas: string
    desafios: string
  }
  time: {
    estrutura: string
    responsabilidades: string
    desenvolvimento: string
  }
  cs: {
    processos: string
    metricas: string
    melhorias: string
  }
  vendas: {
    funil: string
    conversao: string
    estrategias: string
  }
  processos: {
    mapeamento: string
    documentacao: string
    otimizacao: string
  }
  cultura: {
    valores: string
    comunicacao: string
    engajamento: string
  }
}

export default function DiagnosticoCall() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = React.useState("estrategia")
  const [formData, setFormData] = React.useState<FormData>({
    estrategia: {
      objetivos: "",
      metas: "",
      desafios: "",
    },
    time: {
      estrutura: "",
      responsabilidades: "",
      desenvolvimento: "",
    },
    cs: {
      processos: "",
      metricas: "",
      melhorias: "",
    },
    vendas: {
      funil: "",
      conversao: "",
      estrategias: "",
    },
    processos: {
      mapeamento: "",
      documentacao: "",
      otimizacao: "",
    },
    cultura: {
      valores: "",
      comunicacao: "",
      engajamento: "",
    },
  })
  const [formProgress, setFormProgress] = React.useState({
    estrategia: false,
    time: false,
    cs: false,
    vendas: false,
    processos: false,
    cultura: false,
  })

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleTabComplete = (tabId: string) => {
    setFormProgress((prev) => ({
      ...prev,
      [tabId]: true,
    }))
  }

  const handleNextTab = (current: string, next: string) => {
    handleTabComplete(current)
    setActiveTab(next)
  }

  const handleSubmit = async () => {
    handleTabComplete("cultura")
    
    try {
      const response = await fetch("https://hook.us1.make.com/oqv1reow2iqh6pcpmbs369mgbwctmx93", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          etapa: "diagnostico-call",
          dados: formData
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário")
      }

      toast({
        title: "Sucesso!",
        description: "Formulário enviado com sucesso.",
        variant: "default",
      })

      router.push("/organograma")
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const isFormComplete = Object.values(formProgress).every((value) => value === true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/pre-call" className="inline-flex items-center text-teal-600 hover:text-teal-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Etapa 1
            </Link>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Etapa 2 – Diagnóstico Call</CardTitle>
              <CardDescription className="text-teal-50">
                Com base nas informações fornecidas, vamos aprofundar nossa análise
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 rounded-none h-auto">
                  <TabsTrigger value="estrategia" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Estratégia
                    {formProgress.estrategia && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="time" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Time
                    {formProgress.time && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="cs" className="data-[state=active]:bg-teal-50 py-3 relative">
                    CS
                    {formProgress.cs && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="vendas" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Vendas
                    {formProgress.vendas && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="processos" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Processos
                    {formProgress.processos && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="cultura" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Cultura
                    {formProgress.cultura && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="estrategia" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="objetivos">Quais são os objetivos principais da empresa para os próximos 12 meses?</Label>
                      <Textarea
                        id="objetivos"
                        placeholder="Descreva os objetivos principais"
                        className="min-h-[100px]"
                        value={formData.estrategia.objetivos}
                        onChange={(e) => handleInputChange("estrategia", "objetivos", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="metas">Como estão definidas as metas atualmente?</Label>
                      <Textarea
                        id="metas"
                        placeholder="Explique como as metas são definidas e acompanhadas"
                        className="min-h-[100px]"
                        value={formData.estrategia.metas}
                        onChange={(e) => handleInputChange("estrategia", "metas", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="desafios">Quais são os principais desafios para alcançar esses objetivos?</Label>
                      <Textarea
                        id="desafios"
                        placeholder="Liste os principais desafios"
                        className="min-h-[100px]"
                        value={formData.estrategia.desafios}
                        onChange={(e) => handleInputChange("estrategia", "desafios", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => handleNextTab("estrategia", "time")}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="time" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="estrutura">Como está estruturado o time atualmente?</Label>
                      <Textarea
                        id="estrutura"
                        placeholder="Descreva a estrutura do time"
                        className="min-h-[100px]"
                        value={formData.time.estrutura}
                        onChange={(e) => handleInputChange("time", "estrutura", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="responsabilidades">Como estão definidas as responsabilidades?</Label>
                      <Textarea
                        id="responsabilidades"
                        placeholder="Explique como as responsabilidades são distribuídas"
                        className="min-h-[100px]"
                        value={formData.time.responsabilidades}
                        onChange={(e) => handleInputChange("time", "responsabilidades", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="desenvolvimento">Como é feito o desenvolvimento do time?</Label>
                      <Textarea
                        id="desenvolvimento"
                        placeholder="Descreva as práticas de desenvolvimento"
                        className="min-h-[100px]"
                        value={formData.time.desenvolvimento}
                        onChange={(e) => handleInputChange("time", "desenvolvimento", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("estrategia")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      onClick={() => handleNextTab("time", "cs")}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="cs" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="processos-cs">Quais são os principais processos de CS?</Label>
                      <Textarea
                        id="processos-cs"
                        placeholder="Descreva os processos de CS"
                        className="min-h-[100px]"
                        value={formData.cs.processos}
                        onChange={(e) => handleInputChange("cs", "processos", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="metricas-cs">Quais métricas são utilizadas para acompanhar o CS?</Label>
                      <Textarea
                        id="metricas-cs"
                        placeholder="Liste as principais métricas"
                        className="min-h-[100px]"
                        value={formData.cs.metricas}
                        onChange={(e) => handleInputChange("cs", "metricas", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="melhorias-cs">Quais melhorias são necessárias no CS?</Label>
                      <Textarea
                        id="melhorias-cs"
                        placeholder="Descreva as melhorias necessárias"
                        className="min-h-[100px]"
                        value={formData.cs.melhorias}
                        onChange={(e) => handleInputChange("cs", "melhorias", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("time")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      onClick={() => handleNextTab("cs", "vendas")}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="vendas" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="funil">Como está estruturado o funil de vendas?</Label>
                      <Textarea
                        id="funil"
                        placeholder="Descreva o funil de vendas"
                        className="min-h-[100px]"
                        value={formData.vendas.funil}
                        onChange={(e) => handleInputChange("vendas", "funil", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="conversao">Quais são as taxas de conversão atuais?</Label>
                      <Textarea
                        id="conversao"
                        placeholder="Descreva as taxas de conversão"
                        className="min-h-[100px]"
                        value={formData.vendas.conversao}
                        onChange={(e) => handleInputChange("vendas", "conversao", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estrategias">Quais estratégias estão sendo utilizadas para aumentar as vendas?</Label>
                      <Textarea
                        id="estrategias"
                        placeholder="Liste as principais estratégias"
                        className="min-h-[100px]"
                        value={formData.vendas.estrategias}
                        onChange={(e) => handleInputChange("vendas", "estrategias", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("cs")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      onClick={() => handleNextTab("vendas", "processos")}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="processos" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mapeamento">Como é feito o mapeamento de processos?</Label>
                      <Textarea
                        id="mapeamento"
                        placeholder="Descreva o processo de mapeamento"
                        className="min-h-[100px]"
                        value={formData.processos.mapeamento}
                        onChange={(e) => handleInputChange("processos", "mapeamento", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="documentacao">Como é feita a documentação dos processos?</Label>
                      <Textarea
                        id="documentacao"
                        placeholder="Explique o processo de documentação"
                        className="min-h-[100px]"
                        value={formData.processos.documentacao}
                        onChange={(e) => handleInputChange("processos", "documentacao", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="otimizacao">Quais processos precisam de otimização?</Label>
                      <Textarea
                        id="otimizacao"
                        placeholder="Liste os processos que precisam de otimização"
                        className="min-h-[100px]"
                        value={formData.processos.otimizacao}
                        onChange={(e) => handleInputChange("processos", "otimizacao", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("vendas")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      onClick={() => handleNextTab("processos", "cultura")}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="cultura" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="valores-cultura">Como os valores da empresa são praticados no dia a dia?</Label>
                      <Textarea
                        id="valores-cultura"
                        placeholder="Descreva como os valores são aplicados"
                        className="min-h-[100px]"
                        value={formData.cultura.valores}
                        onChange={(e) => handleInputChange("cultura", "valores", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="comunicacao">Como é feita a comunicação interna?</Label>
                      <Textarea
                        id="comunicacao"
                        placeholder="Explique o processo de comunicação"
                        className="min-h-[100px]"
                        value={formData.cultura.comunicacao}
                        onChange={(e) => handleInputChange("cultura", "comunicacao", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="engajamento">Como é promovido o engajamento da equipe?</Label>
                      <Textarea
                        id="engajamento"
                        placeholder="Descreva as práticas de engajamento"
                        className="min-h-[100px]"
                        value={formData.cultura.engajamento}
                        onChange={(e) => handleInputChange("cultura", "engajamento", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("processos")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
                      Concluir e Avançar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {Object.values(formProgress).filter((v) => v).length} de 6 seções preenchidas
              </div>
              <div className="flex gap-2">
                <Link href="/pre-call">
                  <Button variant="outline">Cancelar</Button>
                </Link>
                <Button onClick={handleSubmit} disabled={!isFormComplete} className="bg-teal-600 hover:bg-teal-700">
                  Enviar Formulário
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

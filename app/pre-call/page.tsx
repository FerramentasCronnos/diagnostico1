"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  dadosGerais: {
    empresa: string
    tempoMercado: string
    colaboradores: string
    produtos: string
    faturamento: string
    ticket: string
    canais: string
  }
  autoanalise: {
    problemas: string
    funcionando: string
    ajuda: string
  }
  equipe: {
    timeAtual: string
    organograma: string
    dorEquipe: string
  }
  processos: {
    processosCriticos: string
    processosDocumentados: string
  }
  cultura: {
    valores: string
    expectativas: string
  }
}

export default function PreCallForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = React.useState("dados-gerais")
  const [formData, setFormData] = React.useState<FormData>({
    dadosGerais: {
      empresa: "",
      tempoMercado: "",
      colaboradores: "",
      produtos: "",
      faturamento: "",
      ticket: "",
      canais: "",
    },
    autoanalise: {
      problemas: "",
      funcionando: "",
      ajuda: "",
    },
    equipe: {
      timeAtual: "",
      organograma: "",
      dorEquipe: "",
    },
    processos: {
      processosCriticos: "",
      processosDocumentados: "",
    },
    cultura: {
      valores: "",
      expectativas: "",
    },
  })
  const [formProgress, setFormProgress] = React.useState({
    "dados-gerais": false,
    autoanalise: false,
    equipe: false,
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
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário")
      }

      toast({
        title: "Sucesso!",
        description: "Formulário enviado com sucesso.",
        variant: "default",
      })

      router.push("/diagnostico-call")
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
            <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao início
            </Link>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Etapa 1 – Formulário Pré-Call</CardTitle>
              <CardDescription className="text-teal-50">
                Preencha as informações abaixo para otimizarmos nossa reunião de diagnóstico
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 rounded-none h-auto">
                  <TabsTrigger value="dados-gerais" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Dados Gerais
                    {formProgress["dados-gerais"] && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="autoanalise" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Autoanálise
                    {formProgress["autoanalise"] && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="equipe" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Equipe
                    {formProgress["equipe"] && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="processos" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Processos
                    {formProgress["processos"] && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="cultura" className="data-[state=active]:bg-teal-50 py-3 relative">
                    Cultura
                    {formProgress["cultura"] && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 absolute top-1 right-1" />
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dados-gerais" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="empresa">Nome da empresa</Label>
                      <Input 
                        id="empresa" 
                        placeholder="Ex: X1 Company" 
                        value={formData.dadosGerais.empresa}
                        onChange={(e) => handleInputChange("dadosGerais", "empresa", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tempo-mercado">Tempo de mercado</Label>
                        <Input 
                          id="tempo-mercado" 
                          placeholder="Ex: 5 anos" 
                          value={formData.dadosGerais.tempoMercado}
                          onChange={(e) => handleInputChange("dadosGerais", "tempoMercado", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="colaboradores">Número de colaboradores</Label>
                        <Input 
                          id="colaboradores" 
                          type="number" 
                          placeholder="Ex: 25" 
                          value={formData.dadosGerais.colaboradores}
                          onChange={(e) => handleInputChange("dadosGerais", "colaboradores", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="produtos">Produtos e serviços oferecidos</Label>
                      <Textarea
                        id="produtos"
                        placeholder="Descreva seus principais produtos e serviços"
                        value={formData.dadosGerais.produtos}
                        onChange={(e) => handleInputChange("dadosGerais", "produtos", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="faturamento">Faturamento mensal médio (últimos 12 meses)</Label>
                        <Input 
                          id="faturamento" 
                          placeholder="Ex: R$ 150.000,00" 
                          value={formData.dadosGerais.faturamento}
                          onChange={(e) => handleInputChange("dadosGerais", "faturamento", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ticket">Ticket médio</Label>
                        <Input 
                          id="ticket" 
                          placeholder="Ex: R$ 5.000,00" 
                          value={formData.dadosGerais.ticket}
                          onChange={(e) => handleInputChange("dadosGerais", "ticket", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="canais">Canais de aquisição</Label>
                      <Textarea 
                        id="canais" 
                        placeholder="Ex: Instagram, Google Ads, Indicações..." 
                        value={formData.dadosGerais.canais}
                        onChange={(e) => handleInputChange("dadosGerais", "canais", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => handleNextTab("dados-gerais", "autoanalise")}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="autoanalise" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="problemas">Quais são os 3 maiores problemas da sua empresa hoje?</Label>
                      <Textarea
                        id="problemas"
                        placeholder="Descreva os principais desafios que sua empresa enfrenta"
                        className="min-h-[120px]"
                        value={formData.autoanalise.problemas}
                        onChange={(e) => handleInputChange("autoanalise", "problemas", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="funcionando">O que está funcionando bem atualmente?</Label>
                      <Textarea
                        id="funcionando"
                        placeholder="Descreva os pontos fortes e o que está dando certo"
                        className="min-h-[100px]"
                        value={formData.autoanalise.funcionando}
                        onChange={(e) => handleInputChange("autoanalise", "funcionando", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ajuda">Quais áreas você sente que mais precisa de ajuda?</Label>
                      <Textarea
                        id="ajuda"
                        placeholder="Ex: Vendas, Marketing, Operações..."
                        className="min-h-[100px]"
                        value={formData.autoanalise.ajuda}
                        onChange={(e) => handleInputChange("autoanalise", "ajuda", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("dados-gerais")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      onClick={() => handleNextTab("autoanalise", "equipe")}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="equipe" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="time-atual">Quantas pessoas no time atual?</Label>
                      <Input 
                        id="time-atual" 
                        type="number" 
                        placeholder="Ex: 15" 
                        value={formData.equipe.timeAtual}
                        onChange={(e) => handleInputChange("equipe", "timeAtual", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="organograma">Como é o organograma hoje?</Label>
                      <Textarea
                        id="organograma"
                        placeholder="Descreva a estrutura hierárquica atual da empresa"
                        className="min-h-[100px]"
                        value={formData.equipe.organograma}
                        onChange={(e) => handleInputChange("equipe", "organograma", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dor-equipe">Qual é sua maior dor com equipe?</Label>
                      <Textarea
                        id="dor-equipe"
                        placeholder="Ex: Rotatividade, produtividade, comunicação..."
                        className="min-h-[100px]"
                        value={formData.equipe.dorEquipe}
                        onChange={(e) => handleInputChange("equipe", "dorEquipe", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("autoanalise")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      onClick={() => handleNextTab("equipe", "processos")}
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
                      <Label htmlFor="processos-criticos">Quais processos você considera críticos hoje?</Label>
                      <Textarea
                        id="processos-criticos"
                        placeholder="Ex: Vendas, Onboarding, Atendimento ao cliente..."
                        className="min-h-[100px]"
                        value={formData.processos.processosCriticos}
                        onChange={(e) => handleInputChange("processos", "processosCriticos", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="processos-documentados">Algum processo está documentado? Qual?</Label>
                      <Textarea
                        id="processos-documentados"
                        placeholder="Descreva quais processos estão documentados e como"
                        className="min-h-[100px]"
                        value={formData.processos.processosDocumentados}
                        onChange={(e) => handleInputChange("processos", "processosDocumentados", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("equipe")}>
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
                      <Label htmlFor="valores">Você tem clareza dos valores da sua empresa?</Label>
                      <Textarea
                        id="valores"
                        placeholder="Descreva os valores da sua empresa, se estiverem definidos"
                        className="min-h-[100px]"
                        value={formData.cultura.valores}
                        onChange={(e) => handleInputChange("cultura", "valores", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectativas">Seu time sabe o que se espera deles?</Label>
                      <Textarea
                        id="expectativas"
                        placeholder="Explique como as expectativas são comunicadas ao time"
                        className="min-h-[100px]"
                        value={formData.cultura.expectativas}
                        onChange={(e) => handleInputChange("cultura", "expectativas", e.target.value)}
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
                {Object.values(formProgress).filter((v) => v).length} de 5 seções preenchidas
              </div>
              <div className="flex gap-2">
                <Link href="/">
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

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface Departamento {
  nome: string
  responsabilidades: string
  kpis: string
  rotinas: string
}

interface FormData {
  departamentos: Departamento[]
}

export default function Departamentos() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = React.useState<FormData>({
    departamentos: [
      {
        nome: "",
        responsabilidades: "",
        kpis: "",
        rotinas: "",
      },
    ],
  })

  const handleInputChange = (index: number, field: keyof Departamento, value: string) => {
    setFormData((prev) => ({
      ...prev,
      departamentos: prev.departamentos.map((dept, i) =>
        i === index ? { ...dept, [field]: value } : dept
      ),
    }))
  }

  const addDepartamento = () => {
    setFormData((prev) => ({
      ...prev,
      departamentos: [
        ...prev.departamentos,
        {
          nome: "",
          responsabilidades: "",
          kpis: "",
          rotinas: "",
        },
      ],
    }))
  }

  const removeDepartamento = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      departamentos: prev.departamentos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://hook.us1.make.com/oqv1reow2iqh6pcpmbs369mgbwctmx93", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          etapa: "departamentos",
          dados: formData,
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

  const isFormValid = formData.departamentos.every(
    (dept) => dept.nome && dept.responsabilidades && dept.kpis && dept.rotinas
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/diagnostico-call" className="inline-flex items-center text-teal-600 hover:text-teal-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Etapa 2
            </Link>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Etapa 3 – Departamentos</CardTitle>
              <CardDescription className="text-teal-50">
                Descreva os departamentos da sua empresa, suas responsabilidades, KPIs e rotinas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                {formData.departamentos.map((dept, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Departamento {index + 1}</h3>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDepartamento(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`nome-${index}`}>Nome do Departamento</Label>
                        <Input
                          id={`nome-${index}`}
                          value={dept.nome}
                          onChange={(e) => handleInputChange(index, "nome", e.target.value)}
                          placeholder="Ex: Marketing, Vendas, RH..."
                        />
                      </div>
                      <div>
                        <Label htmlFor={`responsabilidades-${index}`}>Responsabilidades</Label>
                        <Textarea
                          id={`responsabilidades-${index}`}
                          value={dept.responsabilidades}
                          onChange={(e) => handleInputChange(index, "responsabilidades", e.target.value)}
                          placeholder="Descreva as principais responsabilidades deste departamento"
                          className="min-h-[100px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`kpis-${index}`}>KPIs de Acompanhamento</Label>
                        <Textarea
                          id={`kpis-${index}`}
                          value={dept.kpis}
                          onChange={(e) => handleInputChange(index, "kpis", e.target.value)}
                          placeholder="Liste os principais indicadores de desempenho"
                          className="min-h-[100px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`rotinas-${index}`}>Rotinas Atuais</Label>
                        <Textarea
                          id={`rotinas-${index}`}
                          value={dept.rotinas}
                          onChange={(e) => handleInputChange(index, "rotinas", e.target.value)}
                          placeholder="Descreva as principais rotinas e processos"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </Card>
                ))}

                <Button
                  onClick={addDepartamento}
                  variant="outline"
                  className="w-full border-dashed"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Departamento
                </Button>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {formData.departamentos.length} departamento(s) cadastrado(s)
              </div>
              <div className="flex gap-2">
                <Link href="/diagnostico-call">
                  <Button variant="outline">Voltar</Button>
                </Link>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Próxima Etapa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 
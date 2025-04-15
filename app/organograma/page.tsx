"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, BarChart, Clock, Target, User, LineChart, Percent, DollarSign, Activity } from "lucide-react"

// Define the role data structure
type KPI = {
  name: string
  icon: React.ReactNode
}

type Role = {
  id: string
  title: string
  reportsTo: string | null
  description: string
  kpis: KPI[]
  responsibilities: string[]
  routines: {
    daily: string[]
    weekly: string[]
  }
}

export default function OrgChartPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const roles: Role[] = [
    {
      id: "ceo",
      title: "CEO",
      reportsTo: null,
      description: "Lidera a empresa e define a visão estratégica",
      kpis: [
        { name: "Crescimento de receita", icon: <LineChart className="h-4 w-4" /> },
        { name: "Satisfação de clientes", icon: <Users className="h-4 w-4" /> },
        { name: "Retenção de talentos", icon: <User className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Definir visão e estratégia da empresa",
        "Garantir saúde financeira",
        "Desenvolver lideranças",
      ],
      routines: {
        daily: ["Revisão de indicadores chave", "Comunicação com líderes"],
        weekly: ["Reunião com liderança", "Análise de resultados"],
      },
    },
    {
      id: "cro",
      title: "CRO – Chief Revenue Officer",
      reportsTo: "ceo",
      description: "Maximizar receita e margem da empresa",
      kpis: [
        { name: "Receita por canal", icon: <BarChart className="h-4 w-4" /> },
        { name: "Margem de contribuição total (M.C)", icon: <Percent className="h-4 w-4" /> },
        { name: "CAC por canal", icon: <DollarSign className="h-4 w-4" /> },
        { name: "LTV", icon: <LineChart className="h-4 w-4" /> },
        { name: "ROAS geral", icon: <Activity className="h-4 w-4" /> },
        { name: "Payback médio", icon: <Clock className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Maximizar receita e margem da empresa",
        "Distribuir e otimizar budget entre os funis",
        "Aprovar e acompanhar metas dos times",
        "Definir pricing, metas e novas ofertas",
      ],
      routines: {
        daily: ["Revisão rápida dos dashboards (15 min)", "Check-in com líderes (quando necessário)"],
        weekly: [
          "1x por semana revisar os dashboards com G.M",
          "Aprovar orçamento da semana",
          "Reunião tática com time de liderança (G.M + C.M + Cor. Comercial)",
        ],
      },
    },
    {
      id: "gm",
      title: "Gestor de Marketing",
      reportsTo: "cro",
      description: "Executar a estratégia aprovada pelo CRO",
      kpis: [
        { name: "M.C por time", icon: <Percent className="h-4 w-4" /> },
        { name: "CAC por canal", icon: <DollarSign className="h-4 w-4" /> },
        { name: "Velocidade de entrega", icon: <Clock className="h-4 w-4" /> },
        { name: "Taxa de conversão por canal", icon: <Percent className="h-4 w-4" /> },
        { name: "ROAS por campanha", icon: <Activity className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Executar a estratégia aprovada pelo CRO",
        "Cobrar e acompanhar entregas dos times",
        "Otimizar canais de aquisição",
        "Garantir alinhamento entre copy, tráfego e criativo",
      ],
      routines: {
        daily: [
          "Análise de performance do dia anterior",
          "Check-in rápido com o time (10 min)",
          "Validação de testes ativos",
        ],
        weekly: ["Reunião de alinhamento com C.M", "Acompanhamento dos testes da semana", "Relatório semanal para CRO"],
      },
    },
    {
      id: "cc",
      title: "Coordenador Comercial",
      reportsTo: "cro",
      description: "Gerir vendedores e rotina de vendas",
      kpis: [
        { name: "Taxa de conversão lead > call > venda", icon: <Percent className="h-4 w-4" /> },
        { name: "Receita por vendedor", icon: <DollarSign className="h-4 w-4" /> },
        { name: "Ticket médio", icon: <DollarSign className="h-4 w-4" /> },
        { name: "NPS comercial", icon: <Users className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Gerir vendedores e rotina de vendas",
        "Bater metas de fechamento",
        "Monitorar qualidade dos leads",
      ],
      routines: {
        daily: ["Reunião breve com vendedores (10 min)", "Acompanhamento imediato de resultados"],
        weekly: [
          "Daily com vendedores (10 min)",
          "Treinamento de vendas 1x/semana",
          "Relatório de vendas consolidado (sexta)",
        ],
      },
    },
    {
      id: "cm",
      title: "Coordenador de Marketing",
      reportsTo: "gm",
      description: "Gerenciar o time técnico (copy, tráfego, CRM, etc)",
      kpis: [
        { name: "SLA de entrega", icon: <Clock className="h-4 w-4" /> },
        { name: "Eficiência de criativos", icon: <Target className="h-4 w-4" /> },
        { name: "M.C de campanhas executadas", icon: <Percent className="h-4 w-4" /> },
        { name: "Taxa de retrabalho", icon: <Percent className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Gerenciar o time técnico (copy, tráfego, CRM, etc)",
        "Garantir entrega de campanhas e criativos",
        "Sincronizar áreas para execução sem gargalo",
      ],
      routines: {
        daily: ["Daily rápida com time (10 min)", "Checagem das entregas pendentes e execução"],
        weekly: [
          "1 Daily com time (10 min)",
          "Alinhamento com tráfego, copy e audiovisual (terça)",
          "Status das campanhas (quinta)",
        ],
      },
    },
    {
      id: "gp",
      title: "Gestor de Projetos",
      reportsTo: "gm",
      description: "Transformar estratégias em projetos com cronograma",
      kpis: [
        { name: "% de entregas no prazo", icon: <Clock className="h-4 w-4" /> },
        { name: "Taxa de retrabalho", icon: <Percent className="h-4 w-4" /> },
        { name: "SLA médio dos projetos", icon: <Clock className="h-4 w-4" /> },
        { name: "Tempo médio de execução", icon: <Clock className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Transformar estratégias em projetos com cronograma",
        "Gerenciar prazos, pessoas e entregas",
        "Ser ponte entre áreas (marketing, vendas, produto)",
        "Garantir que os projetos andem com eficiência",
      ],
      routines: {
        daily: ["Reunião rápida com responsáveis pelas tarefas (15 min)", "Monitoramento de entregas e ajustes"],
        weekly: [
          "Check-in com todos os donos de tarefas (segunda)",
          "Atualização do cronograma (quarta)",
          "Status report de entregas (sexta)",
        ],
      },
    },
    {
      id: "tech",
      title: "Setor de Tecnologia",
      reportsTo: "gp",
      description: "Garante que sistemas e plataformas funcionem corretamente",
      kpis: [
        { name: "Taxa de uptime das plataformas", icon: <Percent className="h-4 w-4" /> },
        { name: "Connect Rate", icon: <Percent className="h-4 w-4" /> },
        { name: "SLA (tempo de resolução de problemas)", icon: <Clock className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Garante que sistemas e plataformas funcionem corretamente",
        "Monitora estabilidade e performance das ferramentas digitais",
      ],
      routines: {
        daily: ["Monitorar saúde dos sistemas diariamente", "Solucionar problemas técnicos relatados pela equipe"],
        weekly: [
          "Revisão geral dos sistemas",
          "Planejamento de melhorias técnicas",
          "Atualização do backlog de desenvolvimento",
        ],
      },
    },
    {
      id: "gt",
      title: "Gestor de Tráfego",
      reportsTo: "cm",
      description: "Gerencia campanhas de mídia paga",
      kpis: [
        { name: "Custo por Lead (CPL)", icon: <DollarSign className="h-4 w-4" /> },
        { name: "Custo por compra (CPA)", icon: <DollarSign className="h-4 w-4" /> },
        { name: "ROAS", icon: <Activity className="h-4 w-4" /> },
        { name: "CTR dos anúncios", icon: <Percent className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Gerencia campanhas de mídia paga",
        "Otimiza anúncios diariamente",
        "Controla custos e resultados das campanhas",
      ],
      routines: {
        daily: [
          "Checar performance das campanhas pela manhã",
          "Ajustar orçamento e públicos conforme desempenho",
          "Testar e validar novos anúncios",
        ],
        weekly: [
          "Análise dos resultados da semana",
          "Planejamento de testes para próxima semana",
          "Reunião com C.M para alinhamento estratégico",
        ],
      },
    },
    {
      id: "cw",
      title: "Copywriter",
      reportsTo: "cm",
      description: "Cria textos persuasivos para campanhas e anúncios",
      kpis: [
        { name: "CTR (taxa de cliques)", icon: <Percent className="h-4 w-4" /> },
        { name: "Taxa de conversão (landing pages)", icon: <Percent className="h-4 w-4" /> },
        { name: "Abertura e clique em e-mails", icon: <Percent className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Cria textos persuasivos para campanhas e anúncios",
        "Realiza testes A/B constantes para otimização",
        "Valida qualidade e eficiência dos textos publicados",
      ],
      routines: {
        daily: ["Escrever e revisar textos das campanhas ativas", "Avaliar resultados de testes ativos"],
        weekly: [
          "Revisão dos textos que performaram melhor",
          "Planejamento de novos testes A/B",
          "Brainstorm para novas abordagens",
        ],
      },
    },
    {
      id: "av",
      title: "Audiovisual",
      reportsTo: "cm",
      description: "Produção e edição de vídeos e criativos",
      kpis: [
        { name: "Tempo médio de entrega", icon: <Clock className="h-4 w-4" /> },
        { name: "CTR e CPV dos vídeos produzidos", icon: <Percent className="h-4 w-4" /> },
        { name: "Número de vídeos entregues no prazo", icon: <Target className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Produção e edição de vídeos e criativos",
        "Garantir qualidade e entrega dentro do prazo estipulado",
      ],
      routines: {
        daily: ["Produzir/editar vídeos conforme pauta", "Verificar performance dos criativos anteriores"],
        weekly: [
          "Análise dos vídeos que melhor performaram",
          "Planejamento de produções da semana",
          "Captação de referências e inspirações",
        ],
      },
    },
    {
      id: "vd",
      title: "Vendedor",
      reportsTo: "cc",
      description: "Realiza abordagens comerciais para fechar vendas",
      kpis: [
        { name: "Taxa de conversão pessoal (call → venda)", icon: <Percent className="h-4 w-4" /> },
        { name: "Receita individual gerada", icon: <DollarSign className="h-4 w-4" /> },
        { name: "Ticket médio das vendas realizadas", icon: <DollarSign className="h-4 w-4" /> },
      ],
      responsibilities: [
        "Realiza abordagens comerciais para fechar vendas",
        "Mantém qualidade no atendimento dos leads",
        "Busca atingir metas individuais de vendas",
      ],
      routines: {
        daily: [
          "Realizar atendimentos conforme leads recebidos",
          "Registrar atividades no CRM",
          "Acompanhar desempenho diário das vendas",
        ],
        weekly: [
          "Participação em treinamentos de vendas",
          "Planejamento de atividades da semana",
          "Review de calls com feedbacks do Coordenador",
        ],
      },
    },
  ]

  // Function to get direct reports for a role
  const getDirectReports = (roleId: string) => {
    return roles.filter((role) => role.reportsTo === roleId)
  }

  // Function to render a role card
  const renderRoleCard = (role: Role) => {
    const directReports = getDirectReports(role.id)

    return (
      <div key={role.id} className="flex flex-col items-center">
        <div
          className={`w-64 p-4 rounded-lg border-2 cursor-pointer transition-all relative bg-white
            ${
              selectedRole?.id === role.id
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
            }`}
          onClick={() => setSelectedRole(role)}
        >
          <h3 className="font-bold text-center">{role.title}</h3>
          {role.reportsTo && (
            <p className="text-xs text-center text-gray-500 mt-1">
              Reporta para: {roles.find((r) => r.id === role.reportsTo)?.title}
            </p>
          )}
        </div>

        {directReports.length > 0 && (
          <>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="relative flex justify-center w-full">
              {directReports.length > 1 && (
                <div
                  className="absolute top-0 w-full h-px bg-gray-300"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                ></div>
              )}
              <div className="flex gap-16">
                {directReports.map((report, index) => (
                  <div key={report.id} className="relative">
                    {directReports.length > 1 && (
                      <div className="absolute top-0 left-1/2 h-8 w-px bg-gray-300 -translate-x-1/2 -translate-y-8"></div>
                    )}
                    {renderRoleCard(report)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Organograma</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Clique em um cargo para ver detalhes e KPIs</p>
        </header>

        <div className="mb-12 overflow-x-auto">
          <div className="min-w-[1600px] p-8">
            <div className="flex justify-center">{renderRoleCard(roles.find((r) => r.id === "ceo")!)}</div>
          </div>
        </div>

        {selectedRole && (
          <Card className="shadow-lg mb-12 max-w-4xl mx-auto">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <CardTitle className="text-xl font-semibold flex items-center justify-between">
                <span>{selectedRole.title}</span>
                {selectedRole.reportsTo && (
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Reporta para: {roles.find((r) => r.id === selectedRole.reportsTo)?.title}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Descrição</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedRole.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">KPIs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedRole.kpis.map((kpi, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="mr-3 bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full">{kpi.icon}</div>
                      <span className="text-gray-700 dark:text-gray-300">{kpi.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Responsabilidades</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedRole.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Rotinas Diárias</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedRole.routines.daily.map((routine, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {routine}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Rotinas Semanais</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedRole.routines.weekly.map((routine, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {routine}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center mt-8">
          <Link href="/diagnostico-call">
            <Button variant="outline" size="lg" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Voltar ao Diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

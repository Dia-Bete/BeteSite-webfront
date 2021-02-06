<template>
  <div class="flex flex-wrap gap-6 justify-center w-full">
    <FeatureCard
      title="Dieta"
      description="Planeje sua dieta com base na nossa calculadora."
      action="Planejar"
      :icon-src="require('../assets/img/diet.svg')"
      anchor="/dieta"
    />
    <!-- <FeatureCard
      title="Minha Saúde"
      description="Gere um relatório sobre seu estado de saúde."
      action="Gerar Relatório"
      :icon-src="require('../assets/img/heart.svg')"
      anchor="/minha-saude"
    />
    <FeatureCard
      title="Tabela de Valores Nutricionais"
      description="Consulte os valores nutricionais na Tabela Brasileira de Composição dos Alimentos."
      action="Consultar"
      :icon-src="require('../assets/img/magnifier.svg')"
      anchor="/tabela-calorias"
    /> -->
    <FeatureCard
      title="Dúvidas"
      description="Informações sobre diabetes preparadas por profissionais de saúde."
      action="Perguntar"
      :icon-src="require('../assets/img/question.svg')"
      anchor="/duvidas"
    />
  </div>
</template>

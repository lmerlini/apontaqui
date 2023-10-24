<template>
  <div>
    <h1>Dashboard</h1>

    <!-- Botão para gerar PDF -->
    <button @click="generatePDF">Download PDF</button>
  </div>
</template>

<script>
export default {
  methods: {
    generatePDF() {
      const docDefinition = {
        content: "Hello World from Dashboard!",
      };

      this.$pdfMake.createPdf(docDefinition).download("Dashboard.pdf");
    },
  },
};
</script>
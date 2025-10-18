import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

function EvolucionMensualChart({ movimientos }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // ✅ Destruye gráfico anterior
    }

    const porMes = {};
    movimientos.forEach((m) => {
      const fecha = new Date(m.document?.fecha);
      const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      porMes[mes] = porMes[mes] || { compras: 0, ventas: 0 };
      if (m.subtype === 'compra') porMes[mes].compras += m.total;
      if (m.subtype === 'venta') porMes[mes].ventas += m.total;
    });

    const labels = Object.keys(porMes).sort();
    const compras = labels.map((mes) => porMes[mes].compras);
    const ventas = labels.map((mes) => porMes[mes].ventas);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Compras',
            data: compras,
            borderColor: '#3498db',
            fill: false,
          },
          {
            label: 'Ventas',
            data: ventas,
            borderColor: '#2ecc71',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Evolución mensual de compras y ventas',
          },
        },
      },
    });
  }, [movimientos]);

  return <canvas ref={canvasRef} height="100"></canvas>;
}

export default EvolucionMensualChart;

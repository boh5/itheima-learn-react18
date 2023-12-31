// 柱状图组件

import {useEffect, useRef} from "react"
import * as echarts from "echarts"

const BarChat = ({title}) => {
  const chartRef = useRef(null)

  useEffect(() => {
    // 保证 dom 可用，才进行图表渲染
    // 1. 获取要渲染的 dom 节点
    const chartDom = chartRef.current
    // 2. 初始化 chart 对象
    const myChart = echarts.init(chartDom)
    // 3. 准备图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar'
        }
      ]
    }
    // 4. 使用图表参数完成渲染
    option && myChart.setOption(option)
  }, []);

  return <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
}

export default BarChat

import { createApp } from 'vue'
import App from './App.vue'
import { Button, Collapse, Divider, Input, InputNumber } from 'ant-design-vue'

const app = createApp(App)

app.use(Button)
app.use(Collapse)
app.use(Divider)
app.use(Input)
app.use(InputNumber)



app.mount('#app')

import {
    Button,
    Select,
    Option,
    Input, Table,
    TableColumn,
    Upload,
    Card,
    Tag,
    Pagination,
    Message,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Divider
} from "element-ui";
import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Option)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Divider)
Vue.prototype.$message = Message
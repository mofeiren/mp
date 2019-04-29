<template>
	<div class="message-wrapper">
		<div class="message-content">
			<el-table :data="tableData5"style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="EventKey"
		      prop="id">
		    </el-table-column>
		    <el-table-column
		      label="Event"
		      prop="name">
		    </el-table-column>
		    <el-table-column
		      label="MsgType"
		      prop="desc">
		    </el-table-column>
		     <el-table-column
		      label="CreateTime"
		      prop="desc">
		    </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="">删除</el-button>
		      </template>
   			</el-table-column>
 		  </el-table>
		</div>
	</div>
</template>
<script>
export default {
	name: '',
	components:{

	},
	data() {
		return{
			tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
		}
	},
	methods:{

	},
	computed: {

	},
	created(){

	},
	mounted(){

	}

}
</script>
<style scoped>
	.message-wrapper{
		padding: 30px 30px 30px 0;
    margin: 30px 30px 30px 15px;
	}
	.message-content {
		background: rgba(0,0,0,.2);
		padding: 30px;
		border-radius: 5px;
	}
	
</style>
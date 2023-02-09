<template>
	<div class="dtk_content clearfix">
		<div class="card-contain-left">
			<div class="container-box" id="sheet_container">
				<div class="page" :style="{ width: '210mm' }">
					<Card :sheetCardVo="sheetCardVo"></Card>
					<!--   -->
				</div>
			</div>
		</div>
		<div class="card-contain-right">
			<div class="outer-wrapper">
				<Config @configChange="configChange"></Config>
			</div>
		</div>
		
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import Card from './components/card.vue';
import Config from './components/config.vue';

import { sheetCardStoreWithOut } from '@/store/modules/sheetCard'
const sheetCardStore = sheetCardStoreWithOut()

const sheetCardVo = sheetCardStore.getSheetCard

function configChange(data: any) {
	sheetCardStore.setSheetCard(data)
}


</script>

<style scoped lang="scss">
@import './sheetCard.css';

.card-contain-right {
	margin-left: 20px;
}

label {
	margin-bottom: 0;
}

.list-group {
	margin-bottom: 0;
}

.error-tip {
	color: red;
	visibility: hidden;
}

#page_tips p {
	margin-top: 10px;
	margin-bottom: 0;
}

.delbtn-box {
	position: absolute;
	right: 30px;
	top: 10px;
	z-index: 2;
	display: none;
}

.fontsize14 {
	font-size: 14px;
}

.fontsize12 {
	font-size: 12px;
}

.radio-pretty {
	position: relative;
	display: inline-block;
	margin-right: 10px;
}

.radio-pretty>input[type='radio'] {
	position: absolute;
	z-index: 2;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	margin: 0;
	cursor: pointer;
	opacity: 0;
	line-height: normal;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding: 0;
}

.radio-pretty label {
	display: inline-block;
	vertical-align: middle;
	width: 40px;
	height: 40px;
	font-weight: 400;
	text-align: center;
	line-height: 38px;
	font-size: 14px;
	background: #fff;
	border: 1px solid #333;
	color: #333;
	border-radius: 4px;
}

.radio-pretty>input[type='radio']:checked+label:after {
	content: '';
}

.radio-pretty input:checked+label {
	background-color: #00a4ff;
	border: 1px solid #00a4ff;
	color: #fff;
}

.add-child-btn {
	margin-left: 80px;
}

.custom-size-handle {
	width: 80px;
	right: 0;
	left: auto;
}

.img-float {
	background-color: #2d8ce4;
	display: block;
	color: white;
	position: absolute;
	height: 25px;
	line-height: 25px;
	padding: 0px 10px;
	cursor: pointer;
	width: 80px;
}

.subTitle span {
	width: 100%;
	display: block;
}

.subques-content p {
	margin: 0;
	padding: 0;
	/*display: inline-block;*/
}

.remove {
	color: red;
	margin-left: 20px;
	cursor: pointer;
}
</style>

<style lang="scss">
.varColor {
	border-color: #ff0000 !important;
	color: #ff0000 !important;

	// 选择题
	.redChoice {
		border-color: #ff0000 !important;
		color: #ff0000 !important;
	}

	.bor-box-open {
		background-image: url('@/assets/num-red.png') !important;
	}
}
</style>

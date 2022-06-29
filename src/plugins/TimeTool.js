const min=1000*60
const hours=min*60
const day=hours*24
//时间转换
export function GetDate(obj) {
	let now = new Date().getTime()
	let date=(now-obj)
	
	if(date<min){
		return Math.floor(toS(date))+"秒前"
	}else if(date<hours){
		return Math.floor(toMin(date))+"分钟前"
	}else if(date<day){
		return Math.floor(toHour(date))+"小时前"
	}else if(date<(day*7)){
		return Math.floor(toDay(date))+"天前"
	}
	let time = new Date(obj)
	date = checkTime(time.getFullYear()) + "-" + checkTime((time.getMonth() + 1)) + "-" + checkTime(time.getDate())
	return date
}

function toS(date){
	return date/1000
}

function toMin(date){
	return toS(date)/60
}

function toHour(date){
	return toMin(date)/60
}

function toDay(date){
	return toHour(date)/24
}

function checkTime(obj) {
	if (obj < 10) {
		return "0" + obj
	}
	return obj
}

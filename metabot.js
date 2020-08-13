console.log('MetabotVK start')
function addStyle(css)
{
	var head = document.head || document.getElementsByTagName('head')[0]
	var style = document.createElement('style')
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	head.appendChild(style)
}


function frmt(min, max, val){ 
	let str=Intl.NumberFormat("ru-RU",{minimumFractionDigits: min, maximumFractionDigits: max, useGrouping:false, style: "decimal"}).format(val); 
	return str.replace(",", ".");
} 

addStyle('.bot_highlight {background: antiquewhite !important; }')
	
function isMobile(){
	var mobile=false;
	var a=document.getElementsByTagName('meta');
	for (var i = 0; i < a.length; i++){
		if (a[i].name='MobileOptimized'){mobile=true;break;}
	}
	return mobile;
}
var mobile_mode=isMobile()


function markVKCommentsMobile()
{

	var x, vkacc, img, span, span1
	var a=document.querySelectorAll('div.pi_signed a.user')

	for (var i = 0; i < a.length; i++){
		if (!a[i].dataset.mt_is_upd){
			x=a[i].className.split('u')[3]

			vkacc= VK_ACCOUNTS[x]
			if (vkacc){
				span = document.createElement("span")
				if (vkacc.v){
					for (var vote in vkacc.v){
						if (ppp[vote]){
							img = document.createElement("img")
							img.className="emoji"
							img.src=ppp[vote].ico
							span.append(img)
						}
					}
				}
				if (vkacc.b){
					span1 = document.createElement("span")
					span1.style.color="red"
					span1.style.fontWeight="bold"
					span1.innerHTML=" БОТ"
					span.append(span1)
				}
				a[i].after(span)
			}

			a[i].dataset.mt_is_upd = 1
		}
	}


	a=document.querySelectorAll('div.ReplyItem__actions a.ReplyItem__action')

	for (var i = 0; i < a.length; i++){
		if (!a[i].dataset.mt_is_upd){
			if (a[i].outerHTML!=""){
				if (a[i].outerHTML.toString().indexOf('Replies.replyTo')>0){
					x=a[i].outerHTML.toString().split(',')[3].split(')')[0].trim()
					vkacc=VK_ACCOUNTS[x]
					if (vkacc){
						y=a[i].parentNode.parentNode.querySelector('.ReplyItem__name')
						span = document.createElement("span")
						if (vkacc.v){
							for (var vote in vkacc.v){
								if (ppp[vote]){
									img = document.createElement("img")
									img.className="emoji"
									img.src=ppp[vote].ico
									span.append(img)
								}
							}
						}
						if (vkacc.b){
							img = document.createElement("img")
							img.className="emoji"
							img.src=botico
							span.append(img)
						}
						y.after(span)

						if (vkacc.b){
							elementToHightlight=a[i].parentNode.parentNode.parentNode.parentNode
							elementToHightlight.className+=" bot_highlight"
						}
					}
				}
			}
			a[i].dataset.mt_is_upd = 1
		}
	}
	setTimeout(markVKCommentsMobile, 5000);
}


function markVKComments()
{

	var imgvote=''
	var x, vkacc, img, span, span1
	var a=document.querySelectorAll('div.wall_signed a.wall_signed_by')

	for (var i = 0; i < a.length; i++){
		if (!a[i].dataset.mt_is_upd){
			if (a[i].attributes['mention_id']){
				x=a[i].getAttribute("mention_id")
				x=x.replace("id","")
				vkacc= VK_ACCOUNTS[x]
				if (vkacc){
					span = document.createElement("span")
					if (vkacc.v){
						for (var vote in vkacc.v){
							if (ppp[vote]){
								img = document.createElement("img")
								img.className="emoji"
								img.src=ppp[vote].ico
								span.append(img)
							}
						}
					}
					if (vkacc.b){
						span1 = document.createElement("span")
						span1.style.color="red"
						span1.style.fontWeight="bold"
						span1.innerHTML=" БОТ"
						span.append(span1)
					}
					a[i].after(span)
				}
			}
			a[i].dataset.mt_is_upd = 1
		}
	}


	a=document.querySelectorAll('div.reply_author a.author')

	var t, v, tv, textvote, imgvote
	for (var i = 0; i < a.length; i++){
		textvote=[]
		imgvote=''
		if (!a[i].dataset.mt_is_upd){
			x=a[i].getAttribute("data-from-id")
			tv=[]
			vkacc= VK_ACCOUNTS[x]
			if (vkacc){
				span = document.createElement("span")
				if (vkacc.v){
					for (var vote in vkacc.v){
						vkacc.v['a']=(!vkacc.v['a'])?1:vkacc.v['a']
						pv=frmt(0, 0, vkacc.v[vote]/vkacc.v['a']*100)+"%"
						if (ppp[vote]){
							tv.push(ppp[vote].info+" - "+pv)
							img = document.createElement("img")
							img.className="emoji"
							img.src=ppp[vote].ico
							span.append(img)
						}
					}
					textvote.push("Предпочтения: "+tv.join(', '))
				}
				if (vkacc.b){
					textvote.push("Вероятно бот "+ppp[vkacc.b].info)
					img = document.createElement("img")
					img.className="emoji"
					img.src=botico
					span.append(img)
				}
				span.setAttribute('onmouseover', "showCovidStatusTooltip(this, '<span><span class=&quot;covidstatus__title&quot;>"+textvote.join('<br>')+"</span>')");
				a[i].after(span)

				if (vkacc.b){
					elementToHightlight=a[i].parentNode.parentNode.parentNode.parentNode
					elementToHightlight.className+=" bot_highlight"
				}

			}

			a[i].dataset.mt_is_upd = 1
		}
	}
	setTimeout(markVKComments, 5000);
}

(!mobile_mode)?markVKComments():markVKCommentsMobile();

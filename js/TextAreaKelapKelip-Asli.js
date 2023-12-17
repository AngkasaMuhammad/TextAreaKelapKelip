"use strict"
/*
Tested in Chrome
*/
let taa = {}

;{
	let lih = ru.lihat
	let que = ru.que
	let attr = ru.attr
	
	let datang = e=>moutex.textContent = attr(e.target,'mousedescr',)
	let pergi = e=>moutex.textContent = ''
	
	let moutex = que('#moutex')[0]
	
	let area = que('#area')[0]
	let hasil = que('#hasil')[0]
	let ta = []
	let tadipilih = null
	let linedipilih = null
	
	let f_newline = taa.f_newline = ()=>{
		let ele = document.createElement('div')
		let hasilline = document.createElement('span')
		
		if(linedipilih){
			linedipilih.insertAdjacentElement('afterEnd',ele,)
			getspan(getid(tadipilih)).parentElement.insertAdjacentElement('afterEnd',hasilline,)
		}else{
			area.appendChild(ele)
			hasil.appendChild(hasilline)
		}
		linedipilih = ele
		tadipilih = null
		f_newta()
		
		
		
		return ele
	}
	let textareaid = 0//bertambah terus
	let colorid = 0//bertambah terus
	let f_newta = taa.f_newta = (/*
			text	= ''	,
			visible	= true	,
			time	= 0	,
			speed	= 1	,
			running	= false	,
		*/)=>{
		que(`tbody.muncul`)[0]?.classList.remove('muncul')
		
		let ele	= document.createElement('textarea')	;attr(ele	,'textareaid',textareaid,)
		let hasiltextarea	= document.createElement('span')	;attr(hasiltextarea	,'textareaid',textareaid,)
		let tbody	= document.createElement('tbody')	;attr(tbody	,'textareaid',textareaid,)
		que('#timeline > table')[0].appendChild(tbody)
		attr(tbody,'time',0,)
		attr(tbody,'speed',1,)
		let tr_r	= document.createElement('tr');tbody.appendChild(tr_r)
		let tr_g	= document.createElement('tr');tbody.appendChild(tr_g)
		let tr_b	= document.createElement('tr');tbody.appendChild(tr_b)
		let tr_frame	= document.createElement('tr');tbody.appendChild(tr_frame)
		
		ele	.addEventListener('focus'	,f_tafocus	,)
		ele	.addEventListener('input'	,inputtextarea	,)
		ele	.addEventListener('change'	,changetextarea	,)
		ele	.addEventListener('mouseenter'	,tahover	,)
		ele	.addEventListener('mouseleave'	,tahover	,)
		hasiltextarea	.addEventListener('mouseenter'	,tahover	,)
		hasiltextarea	.addEventListener('mouseleave'	,tahover	,)
		hasiltextarea	.addEventListener('mousedown'	,()=>{ele.focus();dispatchEvent(new FocusEvent('focus'))}	,)
		
		ele.autocapitalize =
		ele.autocomplete = 'off'
		ele.spellcheck = false
		
		if(tadipilih){
			tadipilih.insertAdjacentElement('afterEnd',ele,)
			getspan(getid(tadipilih)).insertAdjacentElement('afterEnd',hasiltextarea,)
		}else{
			linedipilih.appendChild(ele)
			for(let carispan of Array.from(hasil.children)){
				if(!carispan.children.length){
					carispan.appendChild(hasiltextarea)
					break
				}
			}
		}
		tadipilih = ele
		f_newcolor()
		ele.focus()
		resizetextarea()
		
		textareaid++
		return ele
	}
	let getid = taa.getid = ele=>attr(ele,'textareaid',)
	let getcolorid = taa.getcolorid = ele=>attr(ele,'colorid',)
	let gettbody	= taa.gettbody	= id=>que(`tbody[textareaid="${id}"]`)[0]
	let gettextarea	= taa.gettextarea	= id=>que(`textarea[textareaid="${id}"]`)[0]
	let getspan	= taa.getspan	= id=>que(`span[textareaid="${id}"]`)[0]
	let gettd = taa.gettd = id=>que(`td[colorid="${id}"]`)
	let f_newcolor = ()=>{
		let tbody = gettbody(getid(tadipilih))
		let tr_r	= tbody.children[0],td_r	= document.createElement('td'),inp_r	= document.createElement('input');tr_r	.appendChild(td_r	);td_r	.appendChild(inp_r	);attr(td_r	,'colorid',colorid,);inp_r	.type = "number";inp_r	.value = inp_r.max = 255;inp_r.min = 0
		let tr_g	= tbody.children[1],td_g	= document.createElement('td'),inp_g	= document.createElement('input');tr_g	.appendChild(td_g	);td_g	.appendChild(inp_g	);attr(td_g	,'colorid',colorid,);inp_g	.type = "number";inp_g	.value = inp_g.max = 255;inp_g.min = 0
		let tr_b	= tbody.children[2],td_b	= document.createElement('td'),inp_b	= document.createElement('input');tr_b	.appendChild(td_b	);td_b	.appendChild(inp_b	);attr(td_b	,'colorid',colorid,);inp_b	.type = "number";inp_b	.value = inp_b.max = 255;inp_b.min = 0
		let tr_frame	= tbody.children[3],td_frame	= document.createElement('td'),inp_frame	= document.createElement('input');tr_frame	.appendChild(td_frame	);td_frame	.appendChild(inp_frame	);attr(td_frame	,'colorid',colorid,);inp_frame	.type = "number";
		
		let tdframetadi = que('tbody.muncul .colordipilih')[3]
		if(tr_frame.children.length === 1){
			inp_frame.value = 0
		}else if(tdframetadi === td_frame.previousSibling){
			inp_frame.value = +td_frame.previousSibling.firstElementChild.value+1
		}else{
			inp_frame.value = (
				+tdframetadi.firstElementChild.value
				+ +tdframetadi.nextSibling.firstElementChild.value
			)/2
		}
		
		inp_r	.addEventListener('input',f_inp_rgb,)	;inp_r	.addEventListener('change',f_inp_rgb,)	;inp_r	.addEventListener('focus',f_rgbfocus,)	
		inp_g	.addEventListener('input',f_inp_rgb,)	;inp_g	.addEventListener('change',f_inp_rgb,)	;inp_g	.addEventListener('focus',f_rgbfocus,)	
		inp_b	.addEventListener('input',f_inp_rgb,)	;inp_b	.addEventListener('change',f_inp_rgb,)	;inp_b	.addEventListener('focus',f_rgbfocus,)	
		inp_frame	.addEventListener('input',urutkan,)	;inp_frame	.addEventListener('change',urutkan,)	;inp_frame	.addEventListener('focus',f_rgbfocus,)	
		
		urutkan()
		updcanv()
		updwarnatext(tbody)
		inp_frame.dispatchEvent(new FocusEvent('focus'))
		colorid++
	}
	let f_rgbfocus = e=>{
		for(let ele of Array.from(que('tbody.muncul .colordipilih'))){
			ele.classList.remove('colordipilih')
		}
		for(let td of Array.from(gettd(getcolorid(e.currentTarget.parentElement)))){
			td.classList.add('colordipilih')
		}
	}
	let f_inp_rgb = ()=>{
		updcanv()
		updwarnatext(gettbody(getid(tadipilih)))
	}
	let urutkan = ()=>{
		let muncul = ru.que('tbody.muncul')[0]
		if(!muncul){return}
		let focustadi = document.activeElement
		for(let id of
		Array.from(
			muncul
			.lastElementChild
			.children
		).sort((aa,bb,)=>
			+aa.firstElementChild.value-
			bb.firstElementChild.value
		).map(aa=>ru.attr(aa,'colorid',))){
			let td = taa.gettd(id)
			td[0].parentElement.appendChild(td[0])
			td[1].parentElement.appendChild(td[1])
			td[2].parentElement.appendChild(td[2])
			td[3].parentElement.appendChild(td[3])
		}
		updcanv()
		focustadi?.focus?.()
	}
	let f_tafocus = e=>{
		linedipilih = (tadipilih = e.currentTarget).parentElement
		for(let ele of Array.from(que('.dipilih'))){
			ele.classList.remove('dipilih')
		}
		tadipilih.classList.add('dipilih')
		
		for(let ele of Array.from(que(`tbody.muncul`))){
			ele.classList.remove('muncul')
		}
		let tbody = gettbody(getid(tadipilih))
		tbody.classList.add('muncul')
		updcanv()
		updtash(tadipilih)
		updtime(tbody)
		updspeed(tbody)
	}
	let delaychange
	let inputtextarea = e=>{
		clearTimeout(delaychange)
		delaychange = setTimeout(changetextarea,333,{currentTarget:e.currentTarget,},)
		resizetextarea()
	}
	let changetextarea = e=>{
		let ta = e.currentTarget
		getspan(getid(ta)).textContent = ta.value
	}
	let tahover = e=>{
		let id = getid(e.currentTarget)
		let ta = gettextarea(id)
		let span = getspan(id)
		
		switch(e.type){
		case 'mouseenter':
			ta.classList.add('tahover')
			span.classList.add('tahover')
		break
		case 'mouseleave':
			ta.classList.remove('tahover')
			span.classList.remove('tahover')
		break
		}
	}
	let resizetextarea = taa.resizetextarea = e=>{
		for(let line of area.children){
			line.style.height = '0px'
			let h = 0
			for(let ta of line.children){
				ta.style.width = '0px'
				ta.style.width = ta.scrollWidth+'px'
				h = Math.max(h,ta.scrollHeight,)
			}
			line.style.height = h+'px'
		}
	}
	let fh//file handle
	let wri//writable
	let fsave = ()=>{
		let json = []
		
		for(let divline of area.children){
			let arrdivline = []
			json.push(arrdivline)
			for(let ta of divline.children){
				let tbody = gettbody(getid(ta))
				let color = []
				for(let td of tbody.lastElementChild.children){
					let arrtd = gettd(getcolorid(td))
					color.push({
						r	:arrtd[0].firstElementChild.value	,
						g	:arrtd[1].firstElementChild.value	,
						b	:arrtd[2].firstElementChild.value	,
						frame	:arrtd[3].firstElementChild.value	,
					})
				}
				arrdivline.push({
					text	:ta.value	,
					visible	:!ta.classList.contains('tatutup')	,
					time	:attr(tbody,'time',)	,
					speed	:attr(tbody,'speed',)	,
					running	:attr(tbody,'running',) !== null	,
					color		,
				})
			}
		}
		
		fh?.createWritable()
		.then(paramwri=>
			(wri = paramwri).write(lih(JSON.stringify(json,null,'\t',)))
		).then(()=>
			wri.close()
		).catch(lih)
	}
	let fsaveas = ()=>{
		showSaveFilePicker()
		.then(paramfh=>{//file handle
			attr(save,'mousedescr','Save '+lih(fh = paramfh).name,)
			fsave()
		}).catch(lih)
	}
	let save = que('#save')[0]
	let tash = que('#tash')[0]
	
	let inptime = que('#inptime')[0]
	let inpspeed = que('#inpspeed')[0]
	let canv = taa.canv = que('#canv')[0]
	let cx = taa.cx = canv.getContext('2d')
	
	let arrwarna = []
	let rgbval = (tr,i,)=>+(tr.children[i]?.firstElementChild.value??0)
	let updtash = ta=>{
		if(ta.classList.contains('tatutup')){
			tash.classList.remove('nyala')
			tash.classList.add('mati')
		}else{
			tash.classList.remove('mati')
			tash.classList.add('nyala')
		}
	}
	let updwarnatext = taa.updwarnatext = tbody=>{
		let id = getid(tbody)
		let time = +attr(tbody,'time',)
		let tr_r	= tbody.children[0]
		let tr_g	= tbody.children[1]
		let tr_b	= tbody.children[2]
		let tr_frame	= tbody.children[3]
		
		ru.habisarr(arrwarna)
		for(let ele of tr_frame.children){
			arrwarna.push(+ele.firstElementChild.value)
		}
		let lerp = ru.arrlerp(arrwarna,time,)
		let {w,i,} = lerp
		
		let ta = gettextarea(id)
		let span = getspan(id)
		ta.style.color =
		span.style.color =
		ru.rgba(
			rgbval(tr_r,i,)*(-w+1)+rgbval(tr_r,i+1,)*w,
			rgbval(tr_g,i,)*(-w+1)+rgbval(tr_g,i+1,)*w,
			rgbval(tr_b,i,)*(-w+1)+rgbval(tr_b,i+1,)*w,
			1,
		)
	}
	let updtime = tbody=>inptime.value = attr(tbody,'time',)
	let updspeed = tbody=>inpspeed.value = attr(tbody,'speed',)
	let updcanv = taa.updcanv = ()=>{
		let tbody = que('tbody.muncul')[0]//tabel animasi warna
		if(!tbody){return}
		let gr = cx.fillStyle = cx.createLinearGradient(0,0,111,1,)
		let awal = +tbody.lastElementChild.firstElementChild.firstElementChild.value
		let akhir = +tbody.lastElementChild.lastElementChild.lastElementChild.value
		
		let chi_r	= tbody.children[0].children
		let chi_g	= tbody.children[1].children
		let chi_b	= tbody.children[2].children
		let chi_frame	= tbody.children[3].children
		
		for(let i in Array.from(chi_r)){
			let frame = +chi_frame[i].firstElementChild.value
			let offset = (frame-awal)/(akhir-awal)
			gr.addColorStop(
				isNaN(offset)?0:offset	,
				ru.rgba(
					+chi_r[i].firstElementChild.value	,
					+chi_g[i].firstElementChild.value	,
					+chi_b[i].firstElementChild.value	,
				1,)
			)
		}
		cx.fillRect(0,0,111,1,)
	}
	let tawal = 0
	let reqani = takhir=>{
		lukis((takhir-tawal)/1000)
		tawal = takhir
		requestAnimationFrame(reqani)
	}
	let lukis = dt=>{
		for(let tbody of Array.from(que('tbody[running]'))){
			let time = +attr(tbody,'time',)
			attr(tbody,'time',time+dt,)
			updwarnatext(tbody)
			if(tbody.classList.contains('muncul')){
				updtime(tbody)
			}
		}
	}
	
	//
	tash.addEventListener('click',()=>{
		tadipilih.classList.toggle('tatutup')
		updtash(tadipilih)
	})
	que('#deletecolor')[0].addEventListener('click',()=>{
		let arrtd = Array.from(que('tbody.muncul .colordipilih'))
		let td_framesibling = 
			arrtd[3].previousSibling
			??
			arrtd[3].nextSibling
		
		for(let td of arrtd){
			if(td.parentElement.children.length === 1){return}
			td.remove()
		}
		urutkan()
		updcanv()
		updwarnatext(que('tbody.muncul')[0])
		td_framesibling.firstElementChild.dispatchEvent(new FocusEvent('focus'))
	})
	que('#deletetextarea')[0].addEventListener('click',()=>{
		let id = getid(tadipilih)
		let tbody = gettbody(id)
		let ta = gettextarea(id)
		let tapar = ta.parentElement
		let tasib =
			ta.previousSibling//ta di samping kirinya
		??//kalo ta = di paling kiri
			tapar?.previousSibling?.lastElementChild//ta di (atasnya, paling kanan)
		??//kalo ta = di paling atas
			ta.nextSibling//ta di samping kanannya
		??//kalo kanankiri gaada ta
			tapar?.nextSibling?.lastElementChild//ta di (bawahnya, paling kanan)
		//kalo sendirian
			//biar
		
		let span = getspan(id)
		let spanpar = span.parentElement
		//let spansib = span.previousSibling??span.nextSibling
		let foceve = new FocusEvent('focus')
		
		if(que('#area textarea').length > 1){
			tbody.remove()
			ta.remove()
			span.remove()
			tasib.dispatchEvent(foceve)
		}
		if(!tapar.children.length){
			tapar.remove()
		}
		if(!spanpar.children.length){
			spanpar.remove()
		}
	})
	inptime.addEventListener('input',e=>attr(que('tbody.muncul')[0],'time',e.currentTarget.value,))
	inpspeed.addEventListener('input',e=>attr(que('tbody.muncul')[0],'speed',e.currentTarget.value,))
	que('#newcolor')[0].addEventListener('click',f_newcolor,)
	for(let ele of que('[mousedescr]')){
		ele.addEventListener('mouseenter',datang,)
		ele.addEventListener('mouseleave',pergi,)
	}
	addEventListener('mousemove',e=>{
		let x = Math.min(e.clientX+11,innerWidth-moutex.clientWidth,)
		let y = Math.min(e.clientY+11,innerHeight-moutex.clientHeight,)
		moutex.style.left = x+'px'
		moutex.style.top = y+'px'
	})
	que('#newline')[0].addEventListener('click',f_newline,)
	que('#newtextarea')[0].addEventListener('click',f_newta,)
	//sampe sini, bikin open file
	que('#open')[0].addEventListener('click',()=>{
		showOpenFilePicker()
		.then(([paramfh])=>{//file handle
			attr(save,'mousedescr','Save '+lih(fh = paramfh).name,)
			return fh.getFile()
		}).then(file=>
			file.text()
		).then(text=>{
			let json = lih(JSON.parse(text))
			for(let divline of json){
				
			}
		}).catch(lih)
	})
	que('#saveas')[0].addEventListener('click',fsaveas,)
	save.addEventListener('click',()=>fh?fsave():fsaveas(),)
	addEventListener('beforeunload',e=>{
		e.returnValue = 'outttt'
		//return 'kosonggg'
	},)
	que('#play'	)[0].addEventListener('click',e=>attr(que('tbody.muncul')[0],'running',''	,))
	que('#pause'	)[0].addEventListener('click',e=>attr(que('tbody.muncul')[0],'running',null	,))
	addEventListener('load',e=>{
		f_newline()
		requestAnimationFrame(reqani)
	})
	
	//
	
	//
}
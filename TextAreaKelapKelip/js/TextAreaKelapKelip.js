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
	
	let defaultarrcolor = [{
		r	:255	,
		g	:255	,
		b	:255	,
		frame	:0	,
	}]
	let f_newline = taa.f_newline = (
			text	= ''	,
			visible	= true	,
			time	= 0	,
			speed	= 1	,
			running	= false	,
			arrcolor	= defaultarrcolor	,
		)=>{
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
		f_newta(
			ele	,
			text	,
			visible	,
			time	,
			speed	,
			running	,
			arrcolor	,
		)
		
		
		
		return ele
	}
	let textareaid = 0//bertambah terus
	let colorid = 0//bertambah terus
	let f_newta = taa.f_newta = (
			divline		,
			text	= ''	,
			visible	= true	,
			time	= 0	,
			speed	= 1	,
			running	= false	,
			arrcolor	= defaultarrcolor	,
		)=>{
		que(`tbody.muncul`)[0]?.classList.remove('muncul')
		
		let ele	= document.createElement('textarea')	;attr(ele	,'textareaid',textareaid,)
		let hasiltextarea	= document.createElement('span')	;attr(hasiltextarea	,'textareaid',textareaid,)
		let tbody	= document.createElement('tbody')	;attr(tbody	,'textareaid',textareaid,)
		que('#timeline > table')[0].appendChild(tbody)
		attr(tbody,'time',time,)
		attr(tbody,'speed',speed,)
		running?attr(tbody,'running','',):0
		let tr_r	= document.createElement('tr');tbody.appendChild(tr_r)
		let tr_g	= document.createElement('tr');tbody.appendChild(tr_g)
		let tr_b	= document.createElement('tr');tbody.appendChild(tr_b)
		let tr_frame	= document.createElement('tr');tbody.appendChild(tr_frame)
		
		ele	.addEventListener('focus'	,e=>f_tafocus(e.currentTarget)	,)
		ele	.addEventListener('input'	,inputtextarea	,)
		ele	.addEventListener('change'	,e=>changetextarea(e.currentTarget)	,)
		ele	.addEventListener('mouseenter'	,tahover	,)
		ele	.addEventListener('mouseleave'	,tahover	,)
		hasiltextarea	.addEventListener('mouseenter'	,tahover	,)
		hasiltextarea	.addEventListener('mouseleave'	,tahover	,)
		hasiltextarea	.addEventListener('mousedown'	,()=>{ele.focus();dispatchEvent(new FocusEvent('focus'))}	,)
		
		ele.autocapitalize =
		ele.autocomplete = 'off'
		ele.spellcheck = false
		ele.value = text
		
		if(tadipilih){
			tadipilih.insertAdjacentElement('afterEnd',ele,)
			getspan(getid(tadipilih)).insertAdjacentElement('afterEnd',hasiltextarea,)
		}else{
			divline.appendChild(ele)
			for(let carispan of Array.from(hasil.children)){
				if(!carispan.children.length){
					carispan.appendChild(hasiltextarea)
					break
				}
			}
		}
		tadipilih = ele
		for(let {r,g,b,frame,} of arrcolor){
			f_newcolor(tbody,r,g,b,frame,)
		}
		pilihcolor(gettd(getcolorid(tbody.children[3].firstElementChild)))
		resizetextarea()
		textareaid++
		changetextarea(ele)
		
		return ele
	}
	let getid = taa.getid = ele=>attr(ele,'textareaid',)
	let getcolorid = taa.getcolorid = ele=>attr(ele,'colorid',)
	let gettbody	= taa.gettbody	= id=>que(`tbody[textareaid="${id}"]`)[0]
	let gettextarea	= taa.gettextarea	= id=>que(`textarea[textareaid="${id}"]`)[0]
	let getspan	= taa.getspan	= id=>que(`span[textareaid="${id}"]`)[0]
	let gettd = taa.gettd = id=>que(`td[colorid="${id}"]`)
	
	let f_newcolor = (
		tbody	= null	,
		r	= 255	,
		g	= 255	,
		b	= 255	,
		frame	= 0	,
	)=>{
		let tr_r	= tbody.children[0],td_r	= document.createElement('td'),inp_r	= document.createElement('input');tr_r	.appendChild(td_r	);td_r	.appendChild(inp_r	);attr(td_r	,'colorid',colorid,);inp_r	.type = "number";inp_r	.step = 'any';inp_r	.value = r	;inp_r.max = 255;inp_r.min = 0
		let tr_g	= tbody.children[1],td_g	= document.createElement('td'),inp_g	= document.createElement('input');tr_g	.appendChild(td_g	);td_g	.appendChild(inp_g	);attr(td_g	,'colorid',colorid,);inp_g	.type = "number";inp_g	.step = 'any';inp_g	.value = g	;inp_g.max = 255;inp_g.min = 0
		let tr_b	= tbody.children[2],td_b	= document.createElement('td'),inp_b	= document.createElement('input');tr_b	.appendChild(td_b	);td_b	.appendChild(inp_b	);attr(td_b	,'colorid',colorid,);inp_b	.type = "number";inp_b	.step = 'any';inp_b	.value = b	;inp_b.max = 255;inp_b.min = 0
		let tr_frame	= tbody.children[3],td_frame	= document.createElement('td'),inp_frame	= document.createElement('input');tr_frame	.appendChild(td_frame	);td_frame	.appendChild(inp_frame	);attr(td_frame	,'colorid',colorid,);inp_frame	.type = "number";inp_frame	.step = 'any';inp_frame	.value = frame	
		
		inp_r	.addEventListener('input',f_inp_rgb,)	;inp_r	.addEventListener('change',f_inp_rgb,)	;inp_r	.addEventListener('focus',f_rgbfocus,)	
		inp_g	.addEventListener('input',f_inp_rgb,)	;inp_g	.addEventListener('change',f_inp_rgb,)	;inp_g	.addEventListener('focus',f_rgbfocus,)	
		inp_b	.addEventListener('input',f_inp_rgb,)	;inp_b	.addEventListener('change',f_inp_rgb,)	;inp_b	.addEventListener('focus',f_rgbfocus,)	
		inp_frame	.addEventListener('input',urutkan,)	;inp_frame	.addEventListener('change',urutkan,)	;inp_frame	.addEventListener('focus',f_rgbfocus,)	
		
		urutkan()
		updwarnatext(tbody)
		colorid++
		
		return [
			td_r	,
			td_g	,
			td_b	,
			td_frame	,
		]
	}
	let f_rgbfocus = e=>{
		for(let ele of Array.from(que('tbody.muncul .colordipilih'))){
			ele.classList.remove('colordipilih')
		}
		pilihcolor(gettd(getcolorid(e.currentTarget.parentElement)))
	}
	let pilihcolor = color=>{
		for(let td of Array.from(color)){
			td.classList.add('colordipilih')
		}
	}
	let f_inp_rgb = ()=>{
		updcanv()
		updwarnatext(gettbody(getid(tadipilih)))
	}
	let urutkan = ()=>{
		let muncul = que('tbody.muncul')[0]
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
		).map(aa=>attr(aa,'colorid',))){
			let td = taa.gettd(id)
			td[0].parentElement.appendChild(td[0])
			td[1].parentElement.appendChild(td[1])
			td[2].parentElement.appendChild(td[2])
			td[3].parentElement.appendChild(td[3])
		}
		updcanv()
		focustadi?.focus?.()
	}
	let f_tafocus = ta=>{
		linedipilih = (tadipilih = ta).parentElement
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
		delaychange = setTimeout(changetextarea,333,e.currentTarget,)
		resizetextarea()
	}
	let changetextarea = ta=>getspan(getid(ta)).textContent = ta.value
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
	let fhsave//file handle
	let fhexport//file handle
	//let wri//writable
	let fsave = async ()=>{
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
		/*
		fhsave?.createWritable()
		.then(paramwri=>
			(wri = paramwri).write(lih(JSON.stringify(json,null,'\t',)))
		).then(()=>
			wri.close()
		).catch(lih)
		*/
		if(!fhsave){return}
		let wri = await fhsave.createWritable()
		await wri.write(lih(JSON.stringify(json,null,'\t',)))
		await wri.close()
	}
	let fsaveas = async ()=>{
		/*
		showSaveFilePicker()
		.then(paramfhsave=>{//file handle
			attr(save,'mousedescr','Save '+lih(fhsave = paramfhsave).name,)
			fsave()
		}).catch(lih)
		*/
		fhsave = await showSaveFilePicker()
		attr(save,'mousedescr','Save '+fhsave.name,)
		fsave()
	}
	let fexport = async ()=>{
		if(!fhexport){return}
		let wri = await fhexport.createWritable()
		await wri.write(lih(hasil.textContent))
		await wri.close()
	}
	let fexportas = async ()=>{
		fhexport = await showSaveFilePicker()
		attr(que('#export')[0],'mousedescr','Export '+fhexport.name,)
		fexport()
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
		let {w,i,} =  ru.arrlerp(arrwarna,time,)
		
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
	let updtime = tbody=>inptime.value = (+attr(tbody,'time',)).toFixed(5)
	let updspeed = tbody=>inpspeed.value = (+attr(tbody,'speed',)).toFixed(5)
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
			attr(tbody,'time',time+dt* +attr(tbody,'speed',),)
			updwarnatext(tbody)
			if(tbody.classList.contains('muncul')){
				updtime(tbody)
			}
		}
	}
	let poilock = ({currentTarget:ele})=>{
		ele.requestPointerLock()
	}
	let speed = que('#speed')[0]
	let colorpos = que('#colorpos')[0]
	let femptyproject = ()=>{
		lih('project kosong')
		
		for(let tbody of que('#timeline > table > tbody')){
			tbody.remove()
		}
		for(let div of que('#area > div')){
			div.remove()
		}
		for(let span of que('#hasil > span')){
			span.remove()
		}
		linedipilih = tadipilih = null
		
		attr(save,'mousedescr','Save',)
		attr(que('#export')[0],'mousedescr','Export',)
		fhsave = null
	}
	let execjson = json=>{
		lih(json)
		//
		let taawal = null
		for(let divlinesrc of json){
			let divline = null
			for(let {
				text	,
				visible	,
				time	,
				speed	,
				running	,
				color	,
			} of divlinesrc){
				if(divline){
					f_newta(divline,text,visible,time,speed,running,color,)
				}else{
					divline = f_newline(text,visible,time,speed,running,color,)
				}
			}
			;taawal = taawal??divline.firstElementChild
		}
		taawal.focus()
		
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
	inptime.addEventListener('input',e=>{
		attr(que('tbody.muncul')[0],'time',e.currentTarget.value,)
		updwarnatext(gettbody(getid(tadipilih)))
	})
	inpspeed.addEventListener('input',e=>attr(que('tbody.muncul')[0],'speed',e.currentTarget.value,))
	que('#newcolor')[0].addEventListener('click',()=>{
		let frame
		let tdframetadi = que('tbody.muncul .colordipilih')[3]
		let tbody = gettbody(getid(tadipilih))
		let tr_frame = tbody.children[3]
		
		if(tdframetadi.nextSibling){//jika tidak di paling kanan
			frame = (
				+tdframetadi	.firstElementChild.value
				+ +tdframetadi.nextSibling	.firstElementChild.value
			)/2
		}else{
			frame = +tdframetadi.firstElementChild.value+1
		}
		
		f_newcolor(tbody,255,255,255,frame,)[3].firstElementChild.focus()
		
	},)
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
	que('#newline')[0].addEventListener('click',()=>{
		f_newline().firstElementChild.focus()
	},)
	que('#newtextarea')[0].addEventListener('click',()=>{
		f_newta().focus()
	},)
	que('#open')[0].addEventListener('click',async ()=>{
		let pickfile = await showOpenFilePicker()
		femptyproject()
		;[fhsave] = pickfile
		attr(save,'mousedescr','Save '+fhsave.name,)
		let json = await fhsave.getFile()
		json = await json.text()
		json = JSON.parse(json)
		execjson(json)
	})
	que('#saveas')[0].addEventListener('click',fsaveas,)
	save.addEventListener('click',()=>fhsave?fsave():fsaveas(),)
	addEventListener('beforeunload',e=>{
		e.returnValue = 'outttt'
		//return 'kosonggg'
	},)
	que('#play'	)[0].addEventListener('click',e=>attr(que('tbody.muncul')[0],'running',''	,))
	que('#pause'	)[0].addEventListener('click',e=>attr(que('tbody.muncul')[0],'running',null	,))
	que('#newproject')[0].addEventListener('click',()=>{
		if(!confirm('Some changes may not be saved.')){return}
		femptyproject()
		f_newline('',true,0,1,false,defaultarrcolor,).firstElementChild.focus()
	},)
	que('#exportas')[0].addEventListener('click',fexportas,)
	que('#export')[0].addEventListener('click',()=>fhexport?fexport():fexportas(),)
	addEventListener('keydown',e=>{
		if(
			(e.keyCode === 9) &&
			(document.activeElement.tagName === 'TEXTAREA')
		){
			e.preventDefault()
			document.execCommand('insertText',null,'\t',)
		}
	})
	speed.addEventListener('mousedown',poilock,)
	colorpos.addEventListener('mousedown',poilock,)
	speed.addEventListener('mousemove',({
		movementX	:movx	,
		currentTarget	:ele	,
	})=>{
		if(document.pointerLockElement !== ele){return}
		let tbody = que(`tbody.muncul`)[0]
		let speed = +attr(tbody,'speed',)
		attr(tbody,'speed',speed+movx/111,)
		updspeed(tbody)
	},)
	colorpos.addEventListener('mousemove',({
		movementX	:movx	,
		currentTarget	:ele	,
	})=>{
		if(document.pointerLockElement !== ele){return}
		let speed = +attr(que(`tbody.muncul`)[0],'speed',)
		let inp_frame = que(`tbody.muncul .colordipilih`)[3].firstElementChild
		inp_frame.value = +inp_frame.value+movx*speed/111
		urutkan()
		updwarnatext(que('tbody.muncul')[0])
	},)
	addEventListener('mouseup',()=>{
		document.exitPointerLock()
	})
	addEventListener('load',async ()=>{
		let res = await fetch('testproject/selamatdatang.json')//sampe sini
		let json = await res.json()
		execjson(json)
		requestAnimationFrame(reqani)
		/*
		return 0
		f_newline('Welcome!',true,0,1,true,[
			{
				r	:255	,
				g	:255	,
				b	:255	,
				frame	:0	,
			},
			{
				r	:111	,
				g	:111	,
				b	:111	,
				frame	:.4	,
			},
			{
				r	:0	,
				g	:255	,
				b	:255	,
				frame	:.9	,
			},
			{
				r	:0	,
				g	:111	,
				b	:0	,
				frame	:1.3	,
			},
		]).firstElementChild.focus()
		requestAnimationFrame(reqani)
		*/
	})
	/*
	button	speed
	
	*/
	//
	
	//
}
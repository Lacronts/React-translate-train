import React, {Component} from 'react'
import {Route, Redirect,  BrowserRouter as Router,} from 'react-router-dom'
import {Home, Transl_nostr, Transl_str, DB, Main} from './components/Pages'
import $ from 'jquery'
import XLSX from 'xlsx'

export default class App extends Component {
	
		constructor(props){
			super(props)
		this.state = {
			nameFile: '',
			fileChoose: false,
			keyMenu: 0,
			bibl:[],
			file:[]
			}
		this.changePage = this.changePage.bind(this)
		this.toStart = this.toStart.bind(this)	
		this.handleSelect = this.handleSelect.bind(this)	
		this.readFile = this.readFile.bind(this)
		this.toMain = this.toMain.bind(this)
		this.add = this.add.bind(this)		
		this.del = this.del.bind(this)		
		this.save = this.save.bind(this)
		}
		
		componentDidMount(){
			$.ajax({
			url : 'http://zrw-db2zab-01.zrw.oao.rzd:8080/translate_train/api.jsp',
			dataType: 'json',
			success : function(json) {
			console.log('примонтировался')
			this.setState({
				bibl: json
			})
			}.bind(this)
			});

		}
		
		changePage(e){
		this.setState({nameFile: e.target.files[0].name,
						fileChoose:true})				
		}
	
		toStart(){
		this.setState({
			nameFile: '',
			fileChoose:false,
			keyMenu:0})		
		}
		
		handleSelect(selectedKey) {
			this.setState({
				keyMenu:selectedKey
			})
		}	
		
		readFile(object) {
			const { bibl } = this.state
			let train_str=[]			
			let file = object.target.files[0]
			let reader = new FileReader()
			reader.readAsText(file)		
			reader.onload = function() {
	     	let train_ish = reader.result.replace(/@/g, '')
				bibl.map((row, rowidx)=>{
					let sk = row.chin.replace(')','\\)')
					let re = new RegExp(('\,'+sk+'\,'),'gi')
					train_ish = train_ish.replace(re, ','+row.rus+',')
					}
				)
			train_str = train_ish.split("#")
			train_str.pop()	
			this.setState({
				file: train_str
			})			
			}.bind(this)			
		}		

		toMain(object){
			this.readFile(object)
			this.changePage(object)
		}
		
		add(){
			let re = new RegExp('%2C','gi');
			let formData = $("form").serialize().replace(re,'.');
			$("form").trigger('reset');
			$.ajax({
				type:"POST",
				url:"http://zrw-db2zab-01.zrw.oao.rzd:8080/translate_train/ins2.jsp",
				data:formData,
				success: function(data) {
					{	
						let newBibl = this.state.bibl
						const newData = JSON.parse(data)	
						newBibl.push(newData)
						this.setState({
							bibl:newBibl
						})
					  }
					}.bind(this)
				})
		}
		
		del(e){
		let id = e.target.dataset.row;
		$.ajax({
				type:"POST",
				url:"http://zrw-db2zab-01.zrw.oao.rzd:8080/translate_train/del.jsp",
				data:{'itemid':id},
				success: function(r) {
					{
						let newBibl = this.state.bibl.filter(row=>row.id != id)
						this.setState({
							bibl:newBibl
						})
					}
					}.bind(this)
				})
		}
		
		save(type='xlsx', fn, dl){
			const elt = document.getElementById('table');
			const wb = XLSX.utils.table_to_book(elt, {sheet:"Mob"});
			return dl ?
			XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
			XLSX.writeFile(wb, fn || ('TrainA_RU.' + (type || 'xlsx')));
		}
		
		render(){
			const {toStart, handleSelect, toMain, add, del, save} = this
			const {nameFile, fileChoose, keyMenu, file, bibl} = this.state
			return(
			<Router basename={'/translate_train'}>
				<div className='main'>				
					<Route exact path="/" render={()=>(
						fileChoose ? (
							<Redirect to="/main" />
							) : (
						<Home 
						nameFile={nameFile}
						toMain={toMain}/>)
					)}
				/>
				<Route path="/main"  render={()=>
					<Main nameFile={nameFile}
					toStart={toStart}
					keyMenu={keyMenu}
					handleSelect={handleSelect}/>}
				/>
				<Route path="/transl_nostr" render={()=>
					<Transl_nostr toStart={toStart}
								  keyMenu={keyMenu}
								  handleSelect={handleSelect}
								  file={file}
								  save={save}/>}
					/>	
				<Route path="/transl_str" render={()=>
					<Transl_str toStart={toStart}
								keyMenu={keyMenu}
								handleSelect={handleSelect}
								file={file}
								save={save}/>} 
					/>	
				<Route path="/db" render={()=>
					<DB toStart={toStart}
						keyMenu={keyMenu}
						handleSelect={handleSelect}
						bibl={bibl}
						add={add}
						del={del}/>} />				
				</div>
			</Router>
			)
		}
}
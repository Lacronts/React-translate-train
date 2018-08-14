import React from 'react'
import {MainMenu} from './Menu'
import {FormControl, Jumbotron, Table, Button } from 'react-bootstrap'
import './Pages.css'

const PageTemplate = ({save=f=>f, children, toStart=f=>f, keyMenu=0, handleSelect=f=>f}) =>
	<div>
        <MainMenu toStart={toStart} keyMenu={keyMenu} handleSelect={handleSelect} save={save}/>
        {children}
	</div>	

const header = ['№','№ ваг.','Конт. отпр.','Род','Грузо- подъемность','Тара','№ накладной','Дата погрузки','Ст.отпр','Ст.назн','Отправитель','Адрес отпр.','Получатель','Адрес получ','Наименование','Код ГНГ','Кол-во мест','Масса','Упаковка','№ конт.','№ пломб','№ контр','Код погр.ст.'] 

export const Home =({nameFile='', toMain=f=>f}) =>	

			<Jumbotron className="text-center">
				<h2 className="title">АС перевода файла Train</h2>
				<label className="btn btn-block btn-main">
					Выберите файл...<FormControl type="file" onChange={toMain} style={{display:"none"}}></FormControl>
				</label>
			</Jumbotron>
	
export const Transl_nostr = ({save=f=>f, toStart=f=>f, keyMenu=0, handleSelect=f=>f, file=[]}) =>
	<PageTemplate save={save} toStart={toStart} keyMenu={keyMenu} handleSelect={handleSelect}>	
        <Table bordered hover id="table">
			<thead>
				<tr>
				</tr>
			</thead>
			<tbody>
			{
				file.map((row,index)=>{
					return(
						<tr key={index}>
							<td>
								{row}
							</td>
						</tr>
						)
					}
				)
			}
			</tbody>
		</Table>
	</PageTemplate>
	
export const Transl_str = ({save=f=>f, toStart=f=>f, keyMenu=0, handleSelect=f=>f, file=[]}) =>
	<PageTemplate save={save} toStart={toStart} keyMenu={keyMenu} handleSelect={handleSelect}>
        <Table bordered hover id="table">
			<thead>
				<tr>
				{header.map((item,index)=>				
					<td key={index}>{item}</td>
				)}
				</tr>
			</thead>
			<tbody>
			{
				file.map((row,rowindex)=>{
					return(
						<tr key={rowindex}>
							{row.split(',').map((cell,cellindex,array)=>{
									if (array.length<23) array.splice(2,0,'')
									return(
										<td key={cellindex}>
											{cell}
										</td>
										)
									}
								)
							}
						</tr>
						)
					}
				)
			}
			</tbody>
		</Table>
	</PageTemplate>
const sortBy = require('lodash/sortBy');	
export const DB = ({toStart=f=>f, keyMenu=0, handleSelect=f=>f, bibl=[], add=f=>f, del=f=>f}) =>
	<PageTemplate toStart={toStart} keyMenu={keyMenu} handleSelect={handleSelect}>
		<div className="container">
		<form>
		<Table bordered hover>
			<thead>
				<tr>
					<th>Слово/словосочетание</th><th>Перевод</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><FormControl autoComplete="off" name="chinese" type="text" placeholder="Введите слово/словосочетание..."/></td>
					<td><FormControl autoComplete="off" name="russian" type="text" placeholder="Введите значение..."/></td>				
					<td><Button bsStyle="success" onClick={add}>Добавить</Button></td>
				</tr>			
				{
				sortBy(bibl, c => parseInt(c.id)).reverse().map((row, rowidx)=>
					<tr key={rowidx}>
						<td>{row.chin}</td>
						<td>{row.rus}</td>	
						<td><Button data-row={row.id} bsStyle="danger" onClick={del}>Удалить</Button></td>		
					</tr>		
					)
				}
			</tbody>
			
		</Table>
		</form>
		</div>
	</PageTemplate>
	
export const Main = ({save=f=>f, nameFile='', toStart=f=>f, keyMenu=0, handleSelect=f=>f}) =>
	<PageTemplate save={save} toStart={toStart} keyMenu={keyMenu} handleSelect={handleSelect}>
		<div className="custom-div">
        <h3>Файл {nameFile} переведен. Выберите в меню нужное представление</h3>
		</div>
	</PageTemplate>	
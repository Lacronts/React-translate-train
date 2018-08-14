import React from 'react'
import {Link} from 'react-router-dom'
import { Navbar, Nav, NavItem, Button, FormControl, FormGroup } from 'react-bootstrap'
import {FaHome} from 'react-icons/fa'
import './Menu.css'


export const MainMenu = ({toStart=f=>f, keyMenu=0, handleSelect=f=>f, save=f=>f})=>					
				<Navbar default collapseOnSelect>	
					<Navbar.Header>
						<Navbar.Brand>
						<Link to="/" onClick={toStart}><FaHome/>  НА ГЛАВНУЮ</Link>
						</Navbar.Brand>
						<Navbar.Toggle />							
					</Navbar.Header>
				<Navbar.Collapse>	
				<Nav bsStyle="tabs" activeKey={keyMenu} onSelect={handleSelect}>				
					<NavItem eventKey={1} componentClass={Link} href="/transl_nostr" to="/transl_nostr">
						Перевод не в структурированном виде
					 </NavItem>		
					<NavItem eventKey={2} componentClass={Link} href="/transl_str" to="/transl_str" >
						Перевод в табличном виде
					</NavItem>			
					<NavItem eventKey={3} componentClass={Link} href="/DB" to="/DB" >
						БД символов
					</NavItem>
				</Nav>	
					<Navbar.Form pullRight >	
						<Button onClick={()=>save('xlsx')} bsStyle="info">
							Сохранить
							</Button>{' '}			
					</Navbar.Form>						
				</Navbar.Collapse>	
				</Navbar>
				
			
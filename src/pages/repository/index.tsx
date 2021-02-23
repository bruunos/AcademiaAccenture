import React, { useEffect, useState } from 'react';
import {Header, Issues, RepositoryInfo} from './style';
import{ Link, useRouteMatch } from 'react-router-dom';

import Logo from '../../img/logo-github.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

interface RepositoryParams{
  repository:string,
}

interface Repositories {
  full_name: string,
  description: string,
  forks_count:number,
  stargazers_count:number,
  open_issues_count:number,
  owner: {
    login: string,
    avatar_url: string
  }
}

interface Issue{
  id:number,
  title:string,
  html_url:string,
  user:{
    login: string,
  }
}

const Repository: React.FC = () => {

  const {params} = useRouteMatch<RepositoryParams>()
  const [repository, setRepository] = useState<Repositories | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect(()=>{
    api.get(`repos/${params.repository}`).then(
      res =>{
        console.log(res.data)
        setRepository(res.data)
      }
    )

    api.get(`repos/${params.repository}/issues`).then(
      res =>{
        console.log(res.data)
        setIssues(res.data)
      }
    )
  },[params, repository])
  return (
      <>
        <Header>
          <img src={Logo} alt="Logo App" />
          <Link to="/">
            <FiChevronLeft size={20}/>Voltar
          </Link>
        </Header>
        {repository && (
          <RepositoryInfo>
            <header>
              <img 
                src={repository.owner.avatar_url} 
                alt={repository.full_name}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
            </header>
            <ul>
              <li>
                <strong>{repository.stargazers_count}</strong>
                <span>Starts</span>
              </li>
              <li>
                <strong>{repository.forks_count}</strong>
                <span>Forks</span>
              </li>
              <li>
                <strong>{repository.open_issues_count}</strong>
                <span>Issues abertas</span>
              </li>
            </ul>
        </RepositoryInfo>
        )}
        
        <Issues>
          {issues.map((issue)=>(
            <Link key={issue.id} to="/">
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20}/>
            </Link>
          ))}
          
        </Issues>
      </>
  );
}

export default Repository;
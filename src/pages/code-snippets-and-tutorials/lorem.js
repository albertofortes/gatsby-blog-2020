import React, {useEffect, useState} from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const squad = [
  {
    name: "Joel robles",
    birth: "06/17/1990",
    position: "Goalkeeper",
    number: 1
  }, 
  {
    name: "Zouhair Feddal",
    birth: "12/23/1989",
    position: "Defender",
    number: 4
  },
  {
    name: "Marc Bartra",
    birth: "01/15/1991",
    position: "Defender",
    number: 5
  },
  {
    name: "Álex Moreno",
    birth: "06/08/1993",
    position: "Defender",
    number: 15
  },
  {
    name: "Aissa Mandi",
    birth: "10/22/1991",
    position: "Defender",
    number: 23
  },
  {
    name: "Nabil Fekir",
    birth: "07/18/1993",
    position: "Midfielder",
    number: 8
  },
  {
    name: "Sergio Canales",
    birth: "02/16/1991",
    position: "Midfielder",
    number: 10
  },
  {
    name: "Andrés Guardado",
    birth: "09/28/1986",
    position: "Midfielder",
    number: 18
  },
  {
    name: "William Carvalho",
    birth: "04/07/1992",
    position: "Midfielder",
    number: 14
  },
  {
    name: "Joaquín",
    birth: "07/21/1981",
    position: "Winger",
    number: 17
  },  
  {
    name: "Loren Morón",
    birth: "12/30/1992",
    position: "Forward",
    number: 16
  }
];

const RadioButtonsBox = styled.div`
  margin: 1rem auto;
  padding: 1rem;
  max-width: 100%;
  background-color: #000;
  display: flex;
  justify-content: space-around;
`

const Table = () => {
  return (
    <>
    <table className='table table-dark '>
      <thead>
        <tr>
          <th>Player</th>
          <th>Number</th>
          <th>Position</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        {squad.map( (player, index) => 
          <tr key={index}><td>{player.name}</td><td>{player.number}</td><td>{player.position}</td><td>{player.birth}</td></tr>
        )}
      </tbody>
    </table>
    </>
  )
}

const Radio = () => {
  const [sortedBy, setSortedBy] = useState('name');

  return (
    <RadioButtonsBox>
      <label><input type='radio' name="sort_by" value="name" checked={sortedBy === 'name'} /> Sort by name</label>
      <label><input type='radio' name="sort_by" value="number" checked={sortedBy === 'number'} /> by Number</label>
      <label><input type='radio' name="sort_by" value="poisiton" checked={sortedBy === 'poisiton'} /> by position</label>
      <label><input type='radio' name="sort_by" value="birth" checked={sortedBy === 'birth'} /> by birth</label>
    </RadioButtonsBox>
  )
}

const OrderTableData = () => {
  const [parameterState, setParameterState] = useState('name');

  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
        }
      }

      file(relativePath: { eq: "images/cookies.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
    <SEO title="Lorem" description={data.site.siteMetadata.description} />
    <article className="article">
        <h2 className="article__title">Lorem Ipsum</h2>
        <h3 className="article__subtitle">Dolor sit amet</h3>
        <p className="article__date">2020-01-21</p>

        <div className="article__image"><Img fluid={data.file.childImageSharp.fluid} alt="Cookie Monster" /></div>
        <div className="article__cont">

          <p>Imagine we have an OrderTableData.js component that call two components:</p>
          <ul>
            <li>components/Radio.js</li>
            <li>components/Table.js</li>
          </ul>

          <p>And an array of objects like:</p>

          <div className="gatsby-highlight" data-language="javascript">
            <pre className="language-javascript line-numbers"><code className="language-javascript">
{`
const squad = [
  {
    name: "Joel robles",
    birth: "06/17/1990",
    position: "Goalkeeper",
    number: 1
  }, 
  {
    name: "Zouhair Feddal",
    birth: "12/23/1989",
    position: "Defender",
    number: 4
  },
  {
    name: "Marc Bartra",
    birth: "01/15/1991",
    position: "Defender",
    number: 5
  },
  {
    name: "Álex Moreno",
    birth: "06/08/1993",
    position: "Defender",
    number: 15
  },
  {
    name: "Aissa Mandi",
    birth: "10/22/1991",
    position: "Defender",
    number: 23
  },
  {
    name: "Nabil Fekir",
    birth: "07/18/1993",
    position: "Midfielder",
    number: 8
  },
  {
    name: "Sergio Canales",
    birth: "02/16/1991",
    position: "Midfielder",
    number: 10
  },
  {
    name: "Andrés Guardado",
    birth: "09/28/1986",
    position: "Midfielder",
    number: 18
  },
  {
    name: "William Carvalho",
    birth: "04/07/1992",
    position: "Midfielder",
    number: 14
  },
  {
    name: "Joaquín",
    birth: "07/21/1981",
    position: "Winger",
    number: 17
  },  
  {
    name: "Loren Morón",
    birth: "12/30/1992",
    position: "Forward",
    number: 16
  }
]
`}
            </code></pre>
          </div>

          <p>We want to show a table of elements that are able to be ordered by name or bithday. This is the Table component:</p>
          
          <div className="gatsby-highlight" data-language="javascript">
            <pre className="language-javascript line-numbers"><code className="language-javascript">
{`
const Table = () => {
  return (
    <>
    <table className='table'>
      <thead>
        <tr>
          <th>Player</th>
          <th>Number</th>
          <th>Position</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        {squad.map( (player, index) => 
          <tr key={index}><td>{player.name}</td><td>{player.number}</td><td>{player.position}</td><td>{player.birth}</td></tr>
        )}
      </tbody>
    </table>
    </>
  )
}
`}
            </code></pre>
          </div>

          <p>The result will be:</p>

          <Table />

          <p>We are going to order them with a different component, the Radio component:</p>

          <div className="gatsby-highlight" data-language="javascript">
            <pre className="language-javascript line-numbers"><code className="language-javascript">
{`
const Radio = () => {
  const [sortedBy, setSortedBy] = useState('name');

  return (
    <div>
      <label><input type='radio' name="sort_by" value="name" checked={sortedBy === 'name'} /> Sort by name</label>
      <label><input type='radio' name="sort_by" value="number" checked={sortedBy === 'number'} /> by Number</label>
      <label><input type='radio' name="sort_by" value="poisiton" checked={sortedBy === 'poisiton'} /> by position</label>
      <label><input type='radio' name="sort_by" value="birth" checked={sortedBy === 'birth'} /> by birth</label>
    </div>
  )
}
`}
            </code></pre>
          </div>

          <p>And the result will be:</p>

          <Radio />

          <p>So as you see, we have two siblings components called from a parent component (OrderTableData.js), one state (orderBy) and no more funcionality... let's play with this and do something dinamic.</p>

          <hr />

          <h3>Lifting States Up as props</h3>

          <p>What we want to do in this excercise is to change the Radio component state "sortedBy" and lift it up as props to the parent Component App which will modify Table component table order. Steps:</p>

          <ul>
            <li>When the user clicks on a radio button (Radio Component) will change sortedBy state in order to change table order</li>
            <li>Radio component lifts up the state as a function propType</li>
            <li>App Component gets that new state with a propType function (passed to Radio component as prop)</li>
            <li>App Component change an inner state according with that propType function and then pass to Table component as props</li>
            <li>And then Table component gets the new state as props and modify the table order</li>
          </ul>

          <p>Maybe less confussing with code. The previous components will be changed according these steps as follows:</p>

          <p>**OrderTableData.js**</p>

          <div className="gatsby-highlight" data-language="javascript">
            <pre className="language-javascript line-numbers"><code className="language-javascript">
{`
const OrderTableData = () => {
  const [parameterState, setParameterState] = useState('name');

  const sortByParameter = (parameter) => {
    setParameterState(parameter);
  };

  return (
    <div>
      <Radio sortBy={this.sortByParameter} />
      <Table sortParameter={this.state.parameterState} />
    </div>
  )
}
`}
            </code></pre>
          </div>
          
          <p>**components/Radio.js**</p>

          <div className="gatsby-highlight" data-language="javascript">
            <pre className="language-javascript line-numbers"><code className="language-javascript">
{`
TO DO
`}
            </code></pre>
          </div>

          <p>**components/Table.js**</p>

          <div className="gatsby-highlight" data-language="javascript">
            <pre className="language-javascript line-numbers"><code className="language-javascript">
{`
TO DO
`}
            </code></pre>
          </div>


        </div>
      </article>
    </Layout>
  )
}

export default OrderTableData


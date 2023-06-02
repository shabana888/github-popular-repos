// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-list">
        {repositoriesData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getRepositories)
  }

  renderLanguageFiltersList = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            isActive={eachLanguageFilter.id === activeLanguageFilterId}
            languageFilterDetails={eachLanguageFilter}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos

// class GithubPopularRepos extends Component {
//   state = {
//     popularRepos: [],
//     apiStatus: apiStatusConstants.initial,
//     activeItem: languageFiltersData[0].id,
//   }

//   componentDidMount() {
//     this.getRepos()
//   }

//   getRepos = async () => {
//     const {activeItem} = this.state
//     this.setState({apiStatus: apiStatusConstants.inProgress})

//     const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeItem}`
//     const response = await fetch(apiUrl)

//     if (response.ok === true) {
//       const data = await response.json()
//       const updatedData = data.popular_repos.map(eachRepo => ({
//         id: eachRepo.id,
//         name: eachRepo.name,
//         issuesCount: eachRepo.issues_count,
//         forksCount: eachRepo.forks_count,
//         starsCount: eachRepo.stars_count,
//         avatarUrl: eachRepo.avatar_url,
//       }))
//       this.setState({
//         popularRepos: updatedData,
//         apiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({apiStatus: apiStatusConstants.failure})
//     }
//   }

//   updateLangId = activeItem => {
//     this.setState({activeItem}, this.getRepos)
//   }

//   renderLoader = () => (
//     <div data-testid="loader">
//       <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
//     </div>
//   )

//   renderPopularRepos = () => {
//     const {popularRepos} = this.state
//     return (
//       <div className="main-container">
//         <div className="items-container">
//           <ul className="items">
//             {popularRepos.map(eachItem => (
//               <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
//             ))}
//           </ul>
//         </div>
//       </div>
//     )
//   }

//   renderLanguages = () => (
//     <ul className="list-container">
//       {languageFiltersData.map(eachLang => (
//         <LanguageFilterItem
//           key={eachLang.id}
//           details={eachLang}
//           updateLangId={this.updateLangId}
//         />
//       ))}
//     </ul>
//   )

//   renderFailure = () => (
//     <div>
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
//         alt="failure view"
//         className="failure-img"
//       />
//     </div>
//   )

//   renderStatus = () => {
//     const {apiStatus} = this.state

//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.renderPopularRepos()
//       case apiStatusConstants.failure:
//         return this.renderFailure()
//       case apiStatusConstants.inProgress:
//         return this.renderLoader()
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <div className="bg-container">
//         <h1 className="popular-heading">Popular</h1>
//         {this.renderLanguages()}
//         {this.renderStatus()}
//       </div>
//     )
//   }
// }

// export default GithubPopularRepos

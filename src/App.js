import { useState } from "react";

function App() {

  const [weatherForecast, setWeatherForecast] = useState(null)

  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=bf935cb8c75b43eb92c212458231710&q=${city}&lang=pt`
    )
      .then((response) => {
        if(response.status === 200){
          return response.json()
        } else {
          alert("Erro ao realizar a consulta!")
        }
      })
      .then((data) => {
        setWeatherForecast(data)
      });
  }


  return (
    <div>
      <nav className="navbar navbar-expand-ad navbar-darck bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão do Tempo
          </a>
      </nav>

      <main className=" container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo da sua cidade!</h1>
          <p className="lead">Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.</p>
          
          <div className="row mb-4">
            <div className="col-md-6">
              <input 
                className="form-control" 
                value={city} 
                onChange={handleChange}
              />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {
            weatherForecast ? (
              <div>
              
                <div className="mt-4 d-flex align-items-center">
                  <div>
                    <img src={weatherForecast.current.condition.icon}/>
                  </div>

                  <div>
                    <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                    <p className="lead font-weight-lighter">Temperatura: {weatherForecast.current.temp_c}º</p>
                    <p className="lead font-weight-lighter text-muted">Humidade: {weatherForecast.current.humidity}%</p>

                  </div>
                </div>

                <div className="mt-4 d-flex align-items-center">
                  <div>
                    <h3>Cidade: {weatherForecast.location.name}</h3>
                    <p className="lead font-weight-lighter text-muted">País: {weatherForecast.location.country}</p>
                    <p className="lead font-weight-lighter text-muted">Data/Hora: {weatherForecast.location.localtime}</p>
                  </div>
                </div>

              </div>
            ) : null
          }


        </div>

      </main>

    </div>
  );
}

export default App;

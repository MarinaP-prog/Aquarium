import { useState } from 'react'
import './App.css'
import rawData from './fishes.json'
import FishList from './components/FishList/FishList'
import FishForm from './components/FishForm/FishForm'


function App() {


  const [listOfFishes, setListOfFishes] = useState(rawData.fish)
  const [vypis, setVypis] = useState('')
  const [aquariumValid, setAquariumValid] = useState(false)
  const [tempDimensions, setTempDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const fishRequirements = {
    small: 10,
    large: 20,
  };

  const [activeTab, setActiveTab] = useState(1)
  const onDelete = (idToDelete) => {
    const temp = listOfFishes.filter(fish => fish.id != idToDelete)
    setListOfFishes(temp)
  }
  const handleAdd = (fishToAdd) => {
   
    if (!fishToAdd.name.trim() || !fishToAdd.species.trim()) {
      return;
  }
  
  setListOfFishes((prevFishes) => [...prevFishes, fishToAdd]);
  };

  const handleDimensionChange = (e) => {

    const source = e.target.name
    let val = e.target.value
    switch (source) {
      case 'width':
        setTempDimensions({ ...tempDimensions, width: val })
        break;
      case 'length':
        setTempDimensions({ ...tempDimensions, length: val })
        break;
      case 'height':
        setTempDimensions({ ...tempDimensions, height: val })
        break;
      default:
        break;
    }
  };
  const handleAddDimensions = () => {
   const newDimensions = ({
      length: parseInt(tempDimensions.length) || 0,
      width: parseInt(tempDimensions.width) || 0,
      height: parseInt(tempDimensions.height) || 0,
    });
    setTempDimensions({
      length: '',
      width: '',
      height: '',
    });
    const newAquariumVolume = (newDimensions.length * newDimensions.width * newDimensions.height) / 1000;
    const requiredVolume = calculateRequiredVolume();
  
    if (newAquariumVolume >= requiredVolume) {
      setVypis("Dostacujici objem");
      setAquariumValid(true);
    } else {
      setVypis("Nedostacujici objem");
      setAquariumValid(false);
    }
  };

  const calculateRequiredVolume = () => {
    let totalVolume = 0;
    listOfFishes.forEach(fish => {
      totalVolume += fish.species === 'velka' ? fishRequirements.large : fishRequirements.small;
    });
    return totalVolume;
  };


  return (
    <>
      <div className="page-container">
        <div className="page-toggler">
          <button
            className={`toggler-btn ${activeTab === 1 ? 'active' : ''}`}
            name='list-of-fishes'
            value={1}
            onClick={() => setActiveTab(1)}
          >
            Seznam ryb
          </button>
          <button
            className={`toggler-btn ${activeTab === 2 ? 'active' : ''}`}
            name='akvarium'
            value={2}
            onClick={() => setActiveTab(2)}
          >
            Akvarium
          </button>
        </div>
        {activeTab === 1 && (
          <>
            <FishList data={listOfFishes}
              onDelete={onDelete}
            />
            <FishForm data={listOfFishes}
              onAdd={handleAdd} />
          </>
        )}
        {activeTab === 2 && (
          <>
            <div className="aquarium-form">
              <input
                type="number"
                name="width"
                id="width"
                placeholder='sirka akvaria v cm'
                min={0}
                value={tempDimensions.width}
                onChange={handleDimensionChange}

              />
              <input
                type="number"
                name="length"
                id="length"
                placeholder='delka akvaria v cm'
                min={0}
                value={tempDimensions.length}
                onChange={handleDimensionChange}

              />
              <input
                type="number"
                name="height"
                id="height"
                placeholder='vyska akvaria v cm'
                min={0}
                value={tempDimensions.height}
                onChange={handleDimensionChange}
              />
              
            </div>
            <p>{vypis}</p>
              <button onClick={handleAddDimensions}>Nastavit rozmery akvaria</button>
            <button
            style={{
              backgroundColor: aquariumValid ? 'green' : 'red',
              color: 'white',
            }}
            disabled={!aquariumValid}
            onClick={() => alert('Akvárium schváleno!')}
          >Zkontrolovat</button>

            

          </>
        )}
      </div>
    </>
  )
}

export default App

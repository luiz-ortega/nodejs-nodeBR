/* docker ps 
docker exec -it c0673f83e338 /
    mongo -u user -p secretpassword --authenticationDatabase herois */

show dbs
use herois
show collections

db.herois.find()
db.herois.find().pretty()

for (let i=0; i<1000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

// create
db.herois.insert({
    name: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

// read
db.herois.find()
db.herois.findOne({_id: ObjectId("6091ff9f75d456b2a420de9a") })

// update
db.herois.update(
    {_id: ObjectId("6091ff9f75d456b2a420de9a") },
    { $set: {name: 'Lanterna verde'}} )
    
//  delete
db.herois.remove({})
db.herois.remove({nome: 'Lanterna verde'})   
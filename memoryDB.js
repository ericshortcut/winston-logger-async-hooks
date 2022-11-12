const {logger} = require('./logger');
const myDB = new Map();
const crypto = require('crypto')

exports._insert = (item)=>{
    logger.info("Insert database",{item});
    const id = crypto.randomUUID()
    if(myDB.has(id)){
        throw new Error(`KEY ALREADY EXISTS: ${id}`);
    }
    myDB.set(id,{...item,id});
    return {...item,id};
}

exports._update = (id, item)=>{
    logger.info("Update database",{id,item});
    if(!myDB.has(id)){
        throw new Error(`KEY DON'T EXISTS: ${id}`);
    }
    myDB.set(id,{...item,id});
}

exports._delete = (id, item)=>{
    logger.info("Deleting Item from database",{id,item});
    if(!myDB.has(id)){
        throw new Error(`KEY DON'T EXISTS: ${id}`);
    }
    myDB.delete(id,{...item,id});
}

exports._findById = (id)=>{
    if(!myDB.has(id)){
        throw new Error(`KEY DOESN'T EXISTS: ${id}`);
    }
    return myDB.get(id);
}

exports._findAll = ()=>{
    return Array.from(myDB.values())
}
const Emergency = require('../models/Emergency');
const Bharosa = require('../models/bharosa');
const LegalAdministration = require('../models/legaladminstration');
const Athamanurbar = require('../models/athamanurbar');
const File=require('../models/fileupload');
const Contact = require('../models/contact');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fileupload= require("../models/fileuploadModel.js")
 const AWS = require('aws-sdk');


// Set the AWS credentials and region
AWS.config.update({
    accessKeyId: 'AKIATCKANFEUJTJXDG5C',
    secretAccessKey: '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',
    region: 'ap-south-1'
});

// Create an S3 service object
const s3 = new AWS.S3();


const emergencyRegister = async (req, res) => {
  try {
    const { name, email, Phonenumber, password } = req.body;
    console.log("reqbodt",req.body)
    let user = await Emergency.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new Emergency({
      name,
      email,
      Phonenumber,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'Emergency registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const emergencyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Emergency.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


const bharosaRegister = async (req, res) => {
    try {
      const { name, email, Phonenumber, password } = req.body;
  
      let user = await Bharosa.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      user = new Bharosa({
        name,
        email,
        Phonenumber,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      res.status(201).json({ message: 'Bharosa registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const bharosaLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let user = await Bharosa.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const legalAdministrationRegister = async (req, res) => {
    try {
      const { name, email, Phonenumber, password } = req.body;
  
      let user = await LegalAdministration.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      user = new LegalAdministration({
        name,
        email,
        Phonenumber,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      res.status(201).json({ message: 'Legal Administration registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const legalAdministrationLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let user = await LegalAdministration.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const athamanurbarRegister = async (req, res) => {
    try {
      const { name, email, Phonenumber, password } = req.body;
  
      let user = await Athamanurbar.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      user = new Athamanurbar({
        name,
        email,
        Phonenumber,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      res.status(201).json({ message: 'Athamanurbar registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const athamanurbarLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let user = await Athamanurbar.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  

//   const uploadFile = async (req, res) => {
//     try {
//         const { originalname, path } = req.file;
//         const user_id=req.user.id;
//         const file = new File({ filename: originalname, path: path,user_id:user_id });
//         await file.save();
//         res.json({ message: 'File uploaded successfully',data:req.user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error uploading file' });
//     }
// };

const uploadFile=async(req,res)=>{
  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
  
    // Specify the bucket name
    const bucketName = 'wecare121';
  
    // Read the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send("Error uploading file");
            return;
        }
  
        // Set the parameters for uploading
        const uploadParams = {
            Bucket: bucketName,
            Key: fileName,
            Body: data
        };
  
        // Upload the file to the S3 bucket
        s3.upload(uploadParams, async(err, uploadData) => {
            if (err) {
                console.error("Error uploading file:", err);
                res.status(500).send("Error uploading file");
                return;
            }
            console.log("File uploaded successfully. Location:", uploadData.Location);
  
                    const user_id=req.user.id;
                    const file = new File({ filename: fileName, path: uploadData.Location,user_id:user_id });
                    await file.save();
                    res.json({ message: 'File uploaded successfully',data:req.user });
        });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({msg:"internal server error"})
  }
}

// const getFile = async (req, res) => {
//     try {
//         const fileId = req.params.id;
//         const file = await File.findById(fileId);
//         if (!file) {
//             return res.status(404).json({ message: 'File not found' });
//         }
//         let contentType = 'application/octet-stream';
//         if (file.filename.endsWith('.pdf')) {
//             contentType = 'application/pdf';
//         } else if (file.filename.endsWith('.doc') || file.filename.endsWith('.docx')) {
//             contentType = 'application/msword';
//         }
//         res.set('Content-Type', contentType);
//         fs.createReadStream(file.path).pipe(res);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching file' });
//     }
// };

// const getFile = async (req, res) => {
//     try {
//         // const token = req.header('Authorization').replace('Bearer ', '');
//         // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // const fileId = req.params.id;
//         console.log("here")
//          const user_id="65f3372e04d42e2912a5b439"//req.user.id
//         const file = await File.find({user_id:user_id}).sort({_id:-1});
//         if (!file) {
//             return res.status(404).json({ message: 'File not found' });
//         }
//         let contentType = 'application/octet-stream';
//         if (file.filename.endsWith('.pdf')) {
//             contentType = 'application/pdf';
//         } else if (file.filename.endsWith('.doc') || file.filename.endsWith('.docx')) {
//             contentType = 'application/msword';
//         }
//         res.set('Content-Type', contentType);
//         fs.createReadStream(file.path).pipe(res);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching file' });
//     }
// };

const getFile = async (req, res) => {
  try {
      console.log("here",req.user);
      const user_id = req.user.id
      const imageFiles = await File.find({ user_id: user_id }); 
      let data=[];
      for(let i=0;i<imageFiles.length;i++){
        data.push(imageFiles[i].path)
      }

    
      res.json({ images: data });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching image files' });
  }
};



const addContact = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const contact = new Contact({ name, phone });
        await contact.save();
        res.json({ message: 'Contact added successfully', contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding contact' });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const { name, phone } = req.body;
        const contact = await Contact.findByIdAndUpdate(contactId, { name, phone }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact updated successfully', contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating contact' });
    }
};

const getContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching contact' });
    }
};

const fileuploadRegister = async (req, res) => {
  try {
    const { name, email, Phonenumber, password } = req.body;

    let user = await fileupload.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new fileupload({
      name,
      email,
      Phonenumber,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'fileupload registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const fileuploadLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await fileupload.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
    emergencyRegister,
    emergencyLogin,
    bharosaRegister,
    bharosaLogin,
    legalAdministrationRegister,
    legalAdministrationLogin,
    athamanurbarRegister,
    athamanurbarLogin,
    uploadFile,
    getFile,
    addContact,
    updateContact,
    getContact,
    fileuploadLogin,
  fileuploadRegister
};

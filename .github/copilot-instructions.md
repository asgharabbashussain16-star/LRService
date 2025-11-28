# Copilot Instructions for LRService

## Architecture Overview

This is a Node.js/Express backend service for a location-based service marketplace. It manages **Services, Sub-Services, Service Providers, and Service Bookings** with dual database support:

- **MongoDB** (primary): Used for most data models via Mongoose (Registers, Services, SubServices, ServiceProviders, BookServices)
- **MySQL** (legacy): Minimal use - only StudentRouter in `RouterMySQL/` uses MySQL for student records

### Data Model Hierarchy
```
Services → SubServices (sname + subname hierarchy)
         → ServiceProviders (providers offering that service)
         → BookServices (customer bookings of services)

Users → Registers (authentication & registration)
```

## Key Files & Patterns

### Router-Model Pairing
Each major feature follows `Router/` + `Model/` pattern:
- **registerRouter.js** ↔ **registerModel.js**: Authentication (register, admin login)
- **SeviceRouter.js** ↔ **ServiceModel.js**: CRUD operations on services
- **SubServiceRouter.js** ↔ **SubServiceModel.js**: Service subcategories
- **ServiceProviderRouter.js** ↔ **ServiceProvider.js**: Provider details
- **BookServiceRouter.js** ↔ **BookService.js**: Service bookings
- **ContactUs.js**: Email notifications via nodemailer (no model)

### Entry Points
- **app.js**: MongoDB-based server (port 4000) - routes `/register`, `/service`, `/subservice`, `/serviceprovider`, `/bookservice`, `/contactus`
- **appsql.js**: MySQL test server (port 4000) - routes `/student` (legacy, rarely used)

## Common Patterns

### Request Handling Pattern
All routers follow this structure:
```javascript
Router.post('/endpoint', async (req,res) => {
  try {
    const data = new Model(req.body);
    const result = await data.save();
    res.send({status: "success", message: "..."})
  } catch(err) {
    res.send(err) // Raw error - not ideal, but consistent
  }
});
```

### Schema Definition Pattern (Mongoose)
- All required fields are marked `required:true`
- Collection naming follows singular form (registers, sevices, subservices)
- No indexes or validation beyond required fields
- Models use `mongoose.model("collectionname", schema)`

### CRUD Operations
- **POST**: Insert with duplicate checking (e.g., SeviceRouter checks service name uniqueness)
- **GET**: Retrieve all (no filtering) or by ID
- **DELETE**: Remove by `_id` (MongoDB) or primary key
- **Update**: Not consistently implemented

## Important Conventions

1. **Typos in codebase**: Model collection is "sevices" (typo), referenced as "services" in comments. Keep consistent with existing DB.
2. **Error Handling**: Catches exceptions but sends raw error objects - consider wrapping with status codes in new endpoints.
3. **Direct Response Objects**: Status responses use `{status: "success"/"failed"/"login", message: "..."}` format. Match this in new code.
4. **Authentication**: Basic email/password check in `/admin` endpoint - no hashing or JWT. Extremely basic security.
5. **Environment Config**: Credentials hardcoded (MongoDB URL in DBConfig.js, Gmail password in ContactUs.js). Never version these.

## Database Connections

### MongoDB (DBConfig/DBConfig.js)
```javascript
mongoose.connect(conURL) // Initializes on app startup
// No error handling after .catch() - connection errors logged to console
```

### MySQL (DBConfig/DBConnect.js)
```javascript
mysql.createConnection({host, user, password, database})
connection.connect((error) => {...})
// Only used by StudentRouter, commented-out post endpoint
```

## Development Workflow

1. **Start Server**: `node app.js` (MongoDB, primary) or `node appsql.js` (MySQL, legacy)
2. **Dependencies**: Install via `npm install` (mongoose, express, mysql, nodemailer, cors, nodemon available)
3. **Port**: Always 4000
4. **Hot Reload**: nodemon configured in package.json for development

## When Adding New Features

- Follow Router/Model split: create `Router/NewFeatureRouter.js` and `Model/NewFeatureModel.js`
- Import router in `app.js` and mount with `app.use('/', newRouter)`
- Use Mongoose for MongoDB features (new code should not use MySQL path unless legacy integration)
- Match existing response format: `{status: "...", message: "..."}`
- Add duplicate/conflict checks before insert (following SeviceRouter pattern)
- Remember to require the router in app.js - easy to forget

## Security Notes (Do Not Implement Without Review)

⚠️ Current state has known issues:
- No password hashing (plain text storage)
- No JWT/token-based auth
- Credentials hardcoded in source
- No input validation/sanitization
- Raw error responses expose internals

Do not expand authentication without addressing these.

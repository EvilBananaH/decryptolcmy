const key = `F+243MSE0D0b025106gn=Uz7267t8fqN`
const iv = `j7NBDi30154S170=`
//const initPayload = `{'PayloadId' : 'f1c4b790-6f5b-48d3-a0ea-7365101e8d25' , 'OutagePassword' : 'wHKTR4q48F6dEb='}`
//const loginPayload = `{'PayloadId' : '05eed09e-f023-451a-b507-2cf90594b80b' , 'UserName' : 'jerry' , 'Password' : 'hejekeke' , 'Model' : 'iPhone 7' , 'OS' : '12.2' , 'InstallationId' : '35ecb319-0df6-401f-8afd-c5ad9d7f438d' , 'Version' : '3.0.27' , 'UserAgent': '' , 'CookieId' : ''}`
// 23.130.208.78 bankingservices.lmcu.org

const decrypt = async (messages_encrypted, lib) => {
	return new Promise((resolve) => {
	let decipher = lib.createDecipheriv('aes-256-cbc', key, iv);
    	let decrypted = decipher.update(messages_encrypted, 'base64', 'utf8');
    		decrypted + decipher.final('utf8');
    	resolve({ messages: decrypted })
	})
    
}

const encrypt = async (messages_raw, lib) => {
    	return new Promise((resolve) => {


	let cipher = lib.createCipheriv('aes-256-cbc', key, iv);
    	let encrypted = cipher.update(messages_raw.message, 'utf8', 'base64');
    		encrypted += cipher.final('base64');
    	resolve({messages: encrypted});
	})    
}

module.exports = {decrypt, encrypt}

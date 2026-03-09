/*

- Buffers hold raw binary data temporarily.
- Streams move data chunk by chunk over time.


const fs = require('fs');

// Create readable stream
const readStream = fs.createReadStream('large-file.txt', 'utf8');

// Event: when data chunk arrives
readStream.on('data', (chunk) => {
    console.log(`📦 Received ${chunk.length} bytes`);
    console.log('Chunk content:', chunk.substring(0, 50) + '...');
});


 */

const fs = require('fs');

// Create readable stream
const readStream = fs.createReadStream("bigData.txt", "utf-8");

// Event: when data chunk arrives
readStream.on('data', (chunk) => {
    console.log(chunk);
})

// Event: when stream ends
readStream.on('end', () => {
    console.log('✅ Finished reading file');
});

// Event: on error
readStream.on('error', (err) => {
    console.error('❌ Error:', err.message);
});
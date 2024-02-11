<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div >
        <h1>Disclaimer</h1>
        <p>This project is intended for experimental purposes only and is not recommended for use in real production environments. 
            The information and guidelines presented here are for informational purposes only and aim to provide a general understanding. 
            Any reader or user should use this information at their own risk and responsibility.
            The content of this document is for information purposes only. 
            Readers and users are strongly advised to consult with an expert before using this information in their applications in 
            production environments. It is crucial to thoroughly test applications in detail to identify potential errors, 
            optimize performance, and address security vulnerabilities.
            Publishers accept no liability for any errors, omissions, direct or indirect damages, 
            losses, or material harm arising from this project. Ensuring the accuracy and currency of the information 
            in this article is the responsibility of the user.
            Before making any changes to any application or system, users should seek assistance and verification support 
            from information technology experts. The use of the guidelines presented in this article is entirely at the
            discretion and responsibility of the reader.
        </p>
        <h1>Elliptic Curve</h1>
        <p>
        Elliptic Curve is a mathematical structure used in cryptographic key exchange protocols and digital signatures. 
        Often referred to as the "elliptic curve," this structure is composed of a set of points defined on a mathematical curve. 
        This curve is determined by a group structure, and a specific addition operation is defined between points.
        </p>
        <h2>Operation Principle</h2>
        <p>
            The elliptic curve consists of points on a field, and mathematical operations are performed on these points. 
            The addition operation between two points involves finding a third point on the curve. 
            Elliptic curves operate in modular arithmetic, ensuring that results are taken modulo a specific value.
            Elliptic curves emerge as significant mathematical structures playing a crucial role in cryptography and mathematics. 
            These curves form the foundation of robust algorithms used in cryptographic applications such as key exchange 
            and digital signatures. To understand elliptic curves, it is essential to grasp fundamental concepts, including 
            how these curves are drawn and how points on them are determined.
        </p>
        <p>
            Elliptic curves are often expressed by mathematical equations, typically represented by the formula.
            These curves consist of points on a specific field on a plane. 
            The appeal of elliptic curves lies in the addition operation defined to obtain the intersection point of a 
            specific point with itself along a certain line. This addition operation is determined by a group structure, 
            especially designed for use in key exchange protocols.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={ellipticCurveGif} alt="Elliptic Curve Gif" style={{ width: '40%' }} />
        </div>
        <p>
            Points on elliptic curves lie on a curve over a specific field, and as the addition operation is defined on these points, 
            the intersection point of a point with itself along the line creates another point. This characteristic provides 
            the mathematical foundations that can be securely and effectively used in key exchange and digital signature algorithms.
        </p>
        <p>
            Large random numbers play a crucial role in the security of elliptic curves. These numbers, especially used in key 
            generation processes and security protocols, facilitate the selection of a specific point on the curve. 
            The selection of this point is critical for cryptographic security and resistance. 
            Large random numbers are employed in securely creating private keys, 
            thus establishing a robust foundation for cryptographic applications.
        </p>
        <h2>Elliptic Curve Diffie-Hellman (ECDH)</h2>
        <p>
            Elliptic Curve is a mathematical structure used in cryptographic key exchange protocols and digital signatures. Often referred to as the "elliptic curve," this structure is composed of a set of points defined on a mathematical curve. This curve is determined by a group structure, and a specific addition operation is defined between points.
        </p>       
        <h3>Operation Principle</h3>
        <ol>
            <li>Each party generates its private key and receives the public key of the other party.</li>
            <li>Both parties calculate a common point with their private keys and the public key of the other party.</li>
            <li>This common point is used to create a shared secret key.</li>
        </ol>
        <p>
            ECDH provides robust security during key exchange and ensures privacy during data exchange.
        </p>
        <h2>Elliptic Curve Integrated Encryption Scheme (ECIES)</h2>
        <p>
            ECIES is a hybrid encryption protocol that utilizes Elliptic Curve Cryptography, 
            often combining asymmetric and symmetric encryption methods.
        </p>
        <h3>Operation Principle</h3>
        <ol>
            <li>The sender generates a random symmetric key for the recipient.</li>
            <li>This key is securely encrypted for the recipient.</li>
            <li>The recipient decrypts the encrypted symmetric key using its private key.</li>
            <li>The obtained symmetric key is used to decrypt the message.</li>
        </ol>
        <p>
            ECIES ensures secure key exchange and encryption, facilitating the secure transmission of messages.
        </p>
        <p>
            This document outlines the fundamental principles of Elliptic Curve Cryptography and how these principles are applied.
            For more details and practical examples, it is recommended to refer to relevant cryptography literature.
        </p>
        <h2>
            Motivation
        </h2>
        <p>
            Motivation for the developed application stems from the historical allowance of MetaMask for programmatically exporting 
            the public key and encrypting messages with the public key. MetaMask has, however, phased out these features. 
            The rationale behind this decision lies in the inherent security risks associated with simultaneously encrypting 
            a message with the public key derived from the private key used for digital signature algorithms in blockchain transactions. 
            Therefore, the application addresses a critical security concern by enabling the generation of a key pair solely through 
            a password, without the need for the public key associated with an Ethereum address. This approach ensures the feasibility 
            of public key encryption without exposing the private key, mitigating potential vulnerabilities in cryptographic operations.
            Check the detailed article <a href="https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686" target="_blank">here</a> .
        </p>
        <img src={eccKeyGen} alt="Elliptic Curve Key Generation" style={{ width: '800px', height: 'auto'}}  />
        <p>
            The workflow of the project is outlined as follows: the recipient generates a key pair with a password. 
            It is not necessary for the recipient to know or store the private key associated with this generated key pair. 
            The crucial aspect here is the careful selection of a sufficiently complex password to ensure security, 
            and it should not be shared with anyone. Subsequently, the sender, who aims to send an encrypted message to the recipient 
            in a way only the recipient can read, encrypts the message with the recipient's shared public key and shares or publishes 
            the encrypted message. Even if the encrypted message is intercepted by third parties, it remains indecipherable without 
            the password. Upon receiving the encrypted message, the recipient uses the same password used to generate the key pair to 
            reproduce the key pair, and then decrypts the message using the private key.
        </p>
        <img src={diagram} alt="flow diagram" style={{ width: '800px', height: 'auto'}} />
    </div>
</body>
</html>

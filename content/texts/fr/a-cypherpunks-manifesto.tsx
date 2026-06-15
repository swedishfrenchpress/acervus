// Manifeste d’un Cypherpunk — Eric Hughes, 9 mars 1993.
// Traduction française reproduite verbatim depuis le fichier fourni ; texte
// original sur activism.net/cypherpunk/manifesto.html.
// Server component: renders only as prose inside the book page's .prose container.

export default function ACypherpunksManifesto() {
  return (
    <>
      <p>
        La vie privée est nécessaire à une société ouverte à l’ère électronique.
        La vie privée n’est pas le secret. Une affaire privée est quelque chose
        que l’on ne veut pas que le monde entier sache, tandis qu’une affaire
        secrète est quelque chose que l’on ne veut que personne ne sache. La vie
        privée est le pouvoir de se révéler sélectivement au monde.
      </p>
      <p>
        Si deux parties ont une sorte de relation, chacune garde un souvenir de
        leur interaction. Chaque partie peut parler de son propre souvenir de
        celle-ci ; comment quiconque pourrait-il l’empêcher ? On pourrait voter
        des lois contre cela, mais la liberté d’expression, encore plus que la
        vie privée, est fondamentale pour une société ouverte ; nous ne cherchons
        à restreindre aucune parole. Si de nombreuses parties parlent ensemble
        dans le même forum, chacune peut s’adresser à toutes les autres et
        agréger des connaissances sur les individus et les autres parties. La
        puissance des communications électroniques a permis cette parole de
        groupe, et elle ne disparaîtra pas simplement parce que nous le
        souhaiterions.
      </p>
      <p>
        Puisque nous désirons la vie privée, nous devons garantir que chaque
        partie à une transaction n’ait connaissance que de ce qui est directement
        nécessaire à cette transaction. Puisque toute information peut être
        divulguée, nous devons nous assurer de révéler le moins possible. Dans la
        plupart des cas, l’identité personnelle n’est pas pertinente. Lorsque
        j’achète un magazine dans un magasin et que je remets de l’argent liquide
        au caissier, il n’est pas nécessaire de savoir qui je suis. Lorsque je
        demande à mon fournisseur de messagerie électronique d’envoyer et de
        recevoir des messages, mon fournisseur n’a pas besoin de savoir à qui je
        parle, ni ce que je dis, ni ce que les autres me disent ; mon fournisseur
        a seulement besoin de savoir comment acheminer le message et combien je
        lui dois en frais. Lorsque mon identité est révélée par le mécanisme
        sous-jacent de la transaction, je n’ai plus de vie privée. Je ne peux pas
        ici me révéler de manière sélective ; je dois toujours me révéler.
      </p>
      <p>
        Par conséquent, la vie privée dans une société ouverte nécessite des
        systèmes de transaction anonymes. Jusqu’à présent, l’argent liquide a été
        le principal système de ce type. Un système de transaction anonyme n’est
        pas un système de transaction secret. Un système anonyme donne aux
        individus le pouvoir de révéler leur identité lorsqu’ils le souhaitent et
        seulement lorsqu’ils le souhaitent ; c’est là l’essence de la vie privée.
      </p>
      <p>
        La vie privée dans une société ouverte nécessite également la
        cryptographie. Si je dis quelque chose, je veux que cela soit entendu
        uniquement par ceux à qui je le destine. Si le contenu de mon discours
        est accessible au monde entier, je n’ai pas de vie privée. Chiffrer,
        c’est manifester le désir de vie privée, et chiffrer avec une
        cryptographie faible, c’est manifester un désir de vie privée peu
        important. De plus, pour révéler son identité avec certitude lorsque
        l’anonymat est la norme, la signature cryptographique est requise.
      </p>
      <p>
        Nous ne pouvons pas attendre des gouvernements, des entreprises ou
        d’autres grandes organisations impersonnelles qu’elles nous accordent la
        vie privée par bienveillance. Il est dans leur intérêt de parler de nous,
        et nous devons nous attendre à ce qu’ils le fassent. Essayer d’empêcher
        leur discours, c’est lutter contre les réalités de l’information.
        L’information ne veut pas seulement être libre, elle aspire à l’être.
        L’information s’étend pour remplir l’espace de stockage disponible.
        L’information est la cousine plus jeune et plus forte de la rumeur ;
        l’information a le pied plus leste, a plus d’yeux, en sait plus et
        comprend moins que la rumeur.
      </p>
      <p>
        Nous devons défendre notre propre vie privée si nous espérons en avoir
        une. Nous devons nous unir et créer des systèmes qui permettent aux
        transactions anonymes d’avoir lieu. Les gens ont défendu leur propre vie
        privée pendant des siècles avec des chuchotements, l’obscurité, des
        enveloppes, des portes closes, des poignées de main secrètes et des
        coursiers. Les technologies du passé ne permettaient pas une vie privée
        forte, mais les technologies électroniques le permettent.
      </p>
      <p>
        Nous, les Cypherpunks, sommes dédiés à la construction de systèmes
        anonymes. Nous défendons notre vie privée avec la cryptographie, avec des
        systèmes de réacheminement anonyme du courrier, avec des signatures
        numériques et avec de la monnaie électronique.
      </p>
      <p>
        Les Cypherpunks écrivent du code. Nous savons que quelqu’un doit écrire
        des logiciels pour défendre la vie privée, et puisque nous ne pouvons pas
        obtenir de vie privée à moins que nous ne le fassions tous, nous allons
        l’écrire. Nous publions notre code afin que nos camarades Cypherpunks
        puissent le pratiquer et jouer avec. Notre code est libre d’utilisation
        pour tous, dans le monde entier. Nous nous soucions peu que vous
        n’approuviez pas le logiciel que nous écrivons. Nous savons que le
        logiciel ne peut pas être détruit et qu’un système largement dispersé ne
        peut pas être arrêté.
      </p>
      <p>
        Les Cypherpunks déplorent les réglementations sur la cryptographie, car
        le chiffrement est fondamentalement un acte privé. L’acte de chiffrer, en
        fait, retire l’information du domaine public. Même les lois contre la
        cryptographie ne portent leurs effets que jusqu’à la frontière d’une
        nation et à la portée de sa violence. La cryptographie s’étendra
        inéluctablement sur le globe entier, et avec elle les systèmes de
        transactions anonymes qu’elle rend possibles.
      </p>
      <p>
        Pour que la vie privée soit généralisée, elle doit faire partie d’un
        contrat social. Les gens doivent se réunir et déployer ces systèmes pour
        le bien commun. La vie privée ne s’étend que jusqu’à la coopération de
        ses semblables dans la société. Nous, les Cypherpunks, sollicitons vos
        questions et vos préoccupations et espérons pouvoir vous engager afin de
        ne pas nous tromper nous-mêmes. Nous ne nous écarterons cependant pas de
        notre cap parce que certains pourraient être en désaccord avec nos
        objectifs.
      </p>
      <p>
        Les Cypherpunks sont activement engagés à rendre les réseaux plus sûrs
        pour la vie privée. Avançons ensemble rapidement.
      </p>
      <p>En avant.</p>
      <p>
        Eric Hughes
        <br />
        9 mars 1993
      </p>
    </>
  );
}

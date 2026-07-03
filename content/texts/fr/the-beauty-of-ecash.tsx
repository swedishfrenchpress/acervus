// La beauté de l’eCash — Hal Finney, 16 mars 1994 (liste de diffusion cypherpunks).
// Traduction française reproduite verbatim depuis le fichier fourni ; texte
// original sur nakamotoinstitute.org/library/the-beauty-of-ecash/.
// Server component: renders only as prose inside the book page's .prose container.

export default function TheBeautyOfECash() {
  return (
    <>
      <p>
        Il me vient à l’esprit que la monnaie numérique pourrait devenir un
        objet de collection. Les billets de papier sont largement
        collectionnés, tout comme les pièces de monnaie. J’ai emprunté à la
        bibliothèque un livre sur l’ancien papier-monnaie américain, et
        beaucoup de ces vieux billets sont d’une beauté saisissante. Fait
        intéressant, l’ancienne monnaie a toujours cours légal ; la valeur des
        billets que vous collectionnez est donc soumise à un seuil minimum.
      </p>

      <p>
        Jusqu’en 1861, les États-Unis n’émettaient aucun papier-monnaie,
        seulement des pièces. À cette époque, le papier-monnaie était émis
        par des banques privées (généralement dotées de chartes étatiques).
        La monnaie était adossée à des dollars, des pièces que la banque
        possédait. Malheureusement, le capitalisme est un système dynamique
        et, à cette époque, les faillites bancaires n’étaient pas plus
        inhabituelles que les faillites d’entreprises aujourd’hui. Lorsque
        cela se produisait, les billets de la banque devenaient sans valeur.
        La contrefaçon était également un gros problème avec les milliers de
        banques différentes émettant des billets. Il est intéressant de
        spéculer que la monnaie numérique pourrait mener à un système
        électronique présentant certaines similitudes avec ces temps anciens.
      </p>

      <p>
        La collection de monnaie numérique pose quelques problèmes. Les
        collectionneurs sont généralement attirés par des objets beaux,
        intéressants et rares. La monnaie numérique est assez intéressante,
        mais sa beauté est plutôt abstraite. La rareté est également
        difficile à évaluer ; chaque billet individuel possède un numéro de
        série unique, et ce qu’il a en commun avec d’autres billets de même
        dénomination, c’est la clé de la banque et l’exposant. Dans le monde
        du papier, les billets non circulés sont généralement plus précieux
        que les autres ; avec les billets de banque numériques, la seule
        façon de savoir s’ils ont été « circulés » serait d’avoir accès à la
        base de données de la banque contenant les billets dépensés, afin de
        vérifier que le billet n’a jamais été déposé.
      </p>

      <p>
        La rareté pourrait être déterminée par la clé et l’exposant de la
        banque. Le système Magic Money prévoit que la banque passe
        périodiquement à un autre ensemble d’exposants pour représenter les
        mêmes dénominations (afin d’éviter que la taille de la base de
        données des billets ne devienne trop importante). Si les banques
        faisaient cela à intervalles réguliers, alors les premières émissions
        seraient particulièrement rares. On pourrait même faire notarier
        (horodater numériquement) un ancien billet de banque afin de pouvoir
        prouver sa valeur dans les années à venir.
      </p>

      <p>
        La beauté est plus difficile à traiter. Strictement parlant, la
        monnaie numérique est invisible, consistant uniquement en un motif
        d’information dans des puces RAM ou sur un disque. Les nombres qui
        représentent la monnaie peuvent cependant être imprimés, et cette
        représentation pourrait posséder une certaine beauté. Malheureusement,
        à mon avis, plusieurs lignes de chiffres hexadécimaux aléatoires ne
        sont pas belles.
      </p>

      <p>
        Je travaille sur des idées pour afficher les informations de la
        monnaie numérique d’une autre manière plus esthétique. Il serait bon
        que l’affichage ne fonctionne que pour les billets de caisse
        correctement signés, la fausse monnaie n’affichant rien de joli. Mon
        idée générale est d’afficher une « empreinte digitale » de chaque
        billet de banque individuel, quelque chose d’unique à ce billet et
        qui possède une sorte de beauté.
      </p>

      <p>
        Une idée sur laquelle j’ai travaillé consiste à initialiser un
        automate cellulaire à 1D avec un motif de bits basé sur la monnaie
        numérique. Cette graine est ensuite traitée par l’algorithme de
        l’automate cellulaire pour produire un motif, chaque ligne étant une
        fonction de la ligne précédente. Ma pensée était de démarrer
        l’automate cellulaire en haut et en bas de l’écran avec les deux
        fonctions différentes appliquées à la monnaie, lesquelles devraient
        être égales si la monnaie est valide (en élevant le nombre à la
        puissance appropriée d’une part, et en appliquant le hachage MD5 du
        numéro de série d’autre part, dans le cas de Magic Money). Ensuite,
        nous travaillons vers l’intérieur à partir des deux graines. La vraie
        monnaie produira un motif symétrique. En choisissant de bonnes règles
        pour l’automate cellulaire, les motifs seront différents pour chaque
        billet, certains plus beaux que d’autres, conduisant à des motifs
        attractifs ressemblant à des fractales pour de nombreux billets.
        Lorsque vous voudriez « regarder votre argent », vous pourriez
        exécuter le programme sur la monnaie numérique. Les gens pourraient
        même échanger des billets particulièrement attrayants.
      </p>

      <p>
        Une idée similaire consiste à utiliser la monnaie comme base pour un
        algorithme fractal. De nombreuses fractales ont la propriété que la
        majeure partie du plan est unie, tandis que seule une fraction semble
        vraiment fractale. La monnaie numérique a la propriété que, lorsqu’elle
        est élevée à une puissance, elle conduit à un nombre dont la plupart
        des bits sont fixes, mais qui possède un petit nombre de bits
        variables. Si nous avions un mappage qui projette les bits fixes de
        la monnaie numérique sur les parties intéressantes de la fractale,
        alors la fausse monnaie ne produirait pas de jolies images, tandis
        que la vraie monnaie produirait une partie d’une belle fractale. Là
        encore, la validation et la beauté seraient liées.
      </p>

      <p>
        J’ai mené quelques expériences avec la première idée, dans l’espoir
        de produire quelque chose d’agréable. Avec un peu plus de réflexion,
        j’espère concevoir un visualiseur pour votre Magic Money qui révélera
        sa beauté naturelle et sa rareté. Ce sera un incontournable pour tous
        les collectionneurs sérieux de monnaie numérique.
      </p>

      <p>Hal Finney</p>
    </>
  );
}

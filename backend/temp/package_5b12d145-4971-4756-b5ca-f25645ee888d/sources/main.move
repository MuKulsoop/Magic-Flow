module NFTCollection {
    use Sui::UID;
    use Sui::Storage;
    use Sui::Event;

    struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: String,
        creator: address
    }

    fun mint_nft(name: String, description: String, url: String) {
        let creator = tx_context::sender();
        let id = UID::new();
        let nft = NFT { id, name, description, url, creator };
        Storage::save(&nft, &nft.id);
        Event::emit(NFTMinted(id, creator));
    }


    struct NFTMinted has drop {
        id: UID,
        creator: address
    }
}
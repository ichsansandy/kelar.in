package co.g2academy.kelarin.service;

import co.g2academy.kelarin.dto.NotificationFirestoreModel;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.FirestoreClient;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import static org.springframework.data.redis.serializer.RedisSerializationContext.string;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ichsan S
 */
@Service
public class FireNotificationService {

    public void sendNotifToUserFirestore(NotificationFirestoreModel notif, String destinationUser) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference parentDocRef = firestore.collection("PushNotification").document(destinationUser);
        // Create a Map to hold the data for the new document
        // Add the data to a new document in the nested collection
        ApiFuture<DocumentReference> result = parentDocRef.collection("NotificationList").add(notif);
        // Wait for the write to complete
        result.get();
    }
    
    public void createDocumentInFirestore(String destinationUser) throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        Map<String, Object> parentData = new HashMap<>();
        parentData.put("user",destinationUser);
        ApiFuture<WriteResult> result = firestore.collection("PushNotification").document(destinationUser).set(parentData);
        // Wait for the write to complete
        result.get();
    }
}
